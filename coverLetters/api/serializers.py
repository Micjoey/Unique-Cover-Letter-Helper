from django.urls import path, include
# from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from coverLetters.models import Job, User, DefaultInfo

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        return token

class JobSerializer(serializers.ModelSerializer):
    LINK_ERROR = "A link is required."
    class Meta:
        model = Job
        fields = '__all__'

    def validate_job_posting_website(self, value): 
        if value: return value
        raise serializers.VaidationError(
            self.LINK_ERROR
        )
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class DefaultInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DefaultInfo
        fields = '__all__'


class ChangePasswordSerializer(serializers.Serializer):
    model = User
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


