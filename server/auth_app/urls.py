from django.urls import include, path

from auth_app.views import (current_user, RegistrationAPI, ResetPasswordAPIView, 
            ResetPasswordConfirmAPIView, LoginAPI, UserAPI)

app_name = 'auth_app'

urlpatterns = [
    path('current-user/', current_user),
    path("register/", RegistrationAPI.as_view()),
    path("login/", LoginAPI.as_view()),
    path("user/", UserAPI.as_view()),
    path('reset/', include([
        path('', ResetPasswordAPIView.as_view(), name='reset_path'),
        path('confirm/', ResetPasswordConfirmAPIView.as_view(), name='reset_confirm_path'),
    ])) 
]
