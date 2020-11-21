from rest_framework import viewsets
from coverLetters.models import Job, UserDetail
from .serializers import JobSerializer
# class JobsPagination(LimitOffsetPagination):
#     default_limit = 50
#     max_limit = 100

class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    queryset = Job.objects.all()



