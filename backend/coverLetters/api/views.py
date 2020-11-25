from rest_framework import viewsets
from coverLetters.models import Job, UserDetail
from .serializers import JobSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import BaseFilterBackend, SearchFilter

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


