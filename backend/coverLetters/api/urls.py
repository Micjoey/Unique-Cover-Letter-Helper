from django.urls import path
from .views import JobListView, JobDetailView

urlpatterns = [
    path("", JobListView.as_view()),
    path("<pk>", JobDetailView.as_view()),
]