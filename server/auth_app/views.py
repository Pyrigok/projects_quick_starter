import uuid

from django.contrib import messages
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, HttpResponse
from django.views.generic import View, FormView, TemplateView
from django.template.loader import render_to_string

from server.settings import REACT_HOST
from server.settings import EMAIL_HOST_USER

from auth_app.models import ResetPasswordModel
from auth_app.forms import ConfirmPasswordForm
from auth_app.serializers import (CreateUserSerializer, UserSerializer, LoginUserSerializer, ResetPasswordSerializer)
from auth_app.tokens import password_reset_token
from auth_app.mail_service import SendMail

from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from knox.models import AuthToken


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class ResetPasswordAPIView(generics.ListCreateAPIView):
    """CBV for resetting a password"""

    queryset = ResetPasswordModel.get_user_info()
    serializer_class = ResetPasswordSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        email = request.data['email']
        if ResetPasswordModel.email_if_exists(email):
            mail_subject = 'Reset your password'
            context = {
                'domain': REACT_HOST,
                'page': 'reset/confirm',
                'uid': str(uuid.uuid1()),
                'token': password_reset_token.make_token(User),
                'email': email,
            }
            message = render_to_string('auth_app/reset_email.html', context)
            letter = SendMail(mail_subject, message, EMAIL_HOST_USER, email)
            letter.send_letter()
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)


class ResetPasswordConfirmAPIView(generics.ListCreateAPIView):
    """CBV for entering and confirmation new password"""

    queryset = ResetPasswordModel.get_user_info()
    serializer_class = ResetPasswordSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        email = request.data['email']
        password = request.data['password1']
        if ResetPasswordModel.set_new_password(email, password):
            return HttpResponse('Password was changed')
        else:
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)


class PasswordResetDone(TemplateView):
    """CBV for message with info that the letter was sent"""

    template_name = 'auth_app/password_reset_done.html'

    def get(self, request):
        return render(request, self.template_name, {})


class PasswordResetConfirm(FormView):
    """CBV for entering and confirmation new password"""

    form = ConfirmPasswordForm()
    template_name = 'auth_app/password_reset_confirm.html'

    def post(self, request, uid64, token, email):
        self.form = ConfirmPasswordForm(data=request.POST)
        if self.form.is_valid():
            password1 = self.form.cleaned_data["password1"]
            password2 = self.form.cleaned_data["password2"]
            if ConfirmPasswordForm.confirm_password(password1, password2):
                ResetPasswordModel.set_new_password(email, password1)
                return HttpResponseRedirect('/reset-password/complete/')
        else:
            return HttpResponse("Incorrect data")

    def get(self, request, uid64, token, email):
        return render(request, self.template_name, {})


class PasswordResetComplete(TemplateView):
    """CBV for message with info that the password was changed"""

    template_name = 'auth_app/password_reset_complete.html'

    def get(self, request):
        return render(request, self.template_name, {})