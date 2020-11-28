from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from coverLetters.models import Job, UserDetail


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
