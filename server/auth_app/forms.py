from django import forms
from django.contrib.auth.models import User


class ConfirmPasswordForm(forms.Form):
    class Meta():
        model = User
        fields = ('password')

    password1 = forms.CharField(label=("Password"), widget=forms.PasswordInput)
    password2 = forms.CharField(label=("Password confirmation"), widget=forms.PasswordInput)

    @staticmethod
    def confirm_password(password1, password2):
        PASSWORD_MIN_LENGTH = 8
        if password1 != password2:
            raise forms.ValidationError('Password and confirm password not matched')
        elif len(password1) < PASSWORD_MIN_LENGTH:
            raise forms.ValidationError('Password should have %d symbols at least' % PASSWORD_MIN_LENGTH)
        elif password1.isdigit():
            raise forms.ValidationError('Password should not be all numeric')
        return password1