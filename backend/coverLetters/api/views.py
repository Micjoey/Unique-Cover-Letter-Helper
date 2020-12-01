from rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from .serializers import ChangePasswordSerializer
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import status
from .serializers import MyTokenObtainPairSerializer
from rest_framework import permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from coverLetters.models import Job, User
from rest_framework.permissions import IsAuthenticated
from .serializers import JobSerializer, UserSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import BaseFilterBackend, SearchFilter
from rest_framework.decorators import action
from rest_framework.response import Response



class JobPagination(PageNumberPagination):
    page_size = 20

class JobFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        filters = {}
        position_title = request.query_params.get('position_title', None)
        return queryset.filter(**filters)


class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    queryset = Job.objects.all()
    pagination_class = JobPagination
    filter_backends = (JobFilterBackend, SearchFilter)
    search_fields = {'position_title', 'company', 'belongs_to_user'}
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        userId = self.request.user.id
        print(userId)
        allJobs = Job.objects.all()
        return allJobs.filter(belongs_to_user=userId)


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    pagination_class = JobPagination
    permission_classes = [IsAuthenticated]


class ObtainTokenView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def patch(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
