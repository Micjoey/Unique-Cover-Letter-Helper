from django.contrib import admin
from django.urls import path, include, re_path
from django.views.decorators.cache import cache_page
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from coverLetters.api.views import ChangePasswordView, FacebookLogin


urlpatterns = [
    path('admin/', admin.site.urls, name='Admin-site'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('coverLetters.api.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('api/change-password/', ChangePasswordView.as_view(),
         name='change-password'),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login')
    re_path(".*")
]
