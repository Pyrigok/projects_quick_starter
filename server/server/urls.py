from django.urls import path, include
from django.views import generic
from django.contrib import admin

from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('', generic.RedirectView.as_view(url='/auth/register/', permanent=False)),
    path('auth/', include('auth_app.urls')),
    path('api/auth/', include('knox.urls')),
    path('token-obtain/', obtain_jwt_token),

    path('admin/', admin.site.urls),
]
