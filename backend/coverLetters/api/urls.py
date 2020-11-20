from django.urls import path
from .views import JobListView, JobDetailView

urlpatterns = [
    path("jobs/", JobListView.as_view()),
    path("jobs/<pk>", JobDetailView.as_view()),
]