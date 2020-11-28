from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from coverLetters.models import Job, UserDetail
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from .serializers import JobSerializer
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
    search_fields = {'position_title', 'company'}
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)

    # def get_queryset(self):
    #     return self.request.user.jobs.all()
    
    


            


