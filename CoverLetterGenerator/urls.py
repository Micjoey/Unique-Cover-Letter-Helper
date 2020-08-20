"""CoverLetterGenerator URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
import coverLetters.views

urlpatterns = [
    path('admin/', admin.site.urls, name='Admin-site'),
    path('', coverLetters.views.homepage, name='homepage'),
    path('all-jobs', coverLetters.views.all_jobs, name='all-jobs'),
    path('all-users', coverLetters.views.all_users, name='all-users'),
    path('job-detail/<int:job_id>', coverLetters.views.job_detail, name='job-detail'),
    path('user-detail/<int:user_id>', coverLetters.views.user_detail, name='user-detail'),
    path('cover-letter-form', coverLetters.views.cover_letter_form,
         name='cover-letter-form'),
    path('cover-letter', coverLetters.views.cover_letter,
         name='cover-letter'),
    path('cover-letter-two', coverLetters.views.cover_letter,
         name='cover-letter-three'),
    path('cover-letter', coverLetters.views.cover_letter,
         name='cover-letter-four'),
    path('cover-letter', coverLetters.views.cover_letter,
         name='cover-letter-five'),
    path('user-form', coverLetters.views.user_form,
         name='user-form'),
    path('user-detail', coverLetters.views.user_detail,
         name='user-detail'),
    
]
