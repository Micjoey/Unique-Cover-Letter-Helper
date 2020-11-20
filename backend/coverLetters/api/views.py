from rest_framework.generics import ListAPIView, RetrieveAPIView
from coverLetters.models import Job, UserDetail
from .serializers import JobSerializer

class JobListView(ListAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer


class JobDetailView(RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
