from rest_framework.generics import ListAPIView, RetrieveAPIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.filters import SearchFilter
from coverLetters.models import Job, UserDetail
from .serializers import JobSerializer


# class JobsPagination(LimitOffsetPagination):
#     default_limit = 50
#     max_limit = 100

class JobListView(ListAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('id',)
    search_fields = ('position_title',)
    # pagination_class = JobsPagination

class JobDetailView(RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer



