from django.db import models
from django.contrib.auth.models import User


class ResetPasswordModel(User):

    @staticmethod
    def get_user_info():
        return User.objects.all()

    @staticmethod
    def username_if_exists(username):
        if User.objects.filter(username=username).exists():
            return True
        return False

    @staticmethod
    def email_if_exists(email):
        if User.objects.filter(email=email).exists():
            return True
        return False

    @staticmethod
    def set_new_password(email, password):
        user = User.objects.get(email=email)
        user.set_password(password)
        user.save()
        return True
