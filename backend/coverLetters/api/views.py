from rest_framework import viewsets
from coverLetters.models import Job, UserDetail
from .serializers import JobSerializer
from rest_framework.pagination import PageNumberPagination


class JobsPagination(PageNumberPagination):
    page_size = 10

class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    queryset = Job.objects.all()
    pagination_class = JobsPagination



