from django.urls import path, include
from django.views import generic
from django.contrib import admin


urlpatterns = [
    path('', generic.RedirectView.as_view(url='/auth/register/', permanent=False)),
    path('auth/', include('auth_app.urls')),

    path('admin/', admin.site.urls),
]
