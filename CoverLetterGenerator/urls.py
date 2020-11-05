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
     #     all users/jobs
    path('cover-letter-generator/all-jobs/', coverLetters.views.all_jobs, name='all-jobs'),
    path('cover-letter-generator/all-users', coverLetters.views.all_users, name='all-users'),
     #
     #  job/user detail
    path('cover-letter-generator/job-detail/<int:job_id>', coverLetters.views.job_detail, name='job-detail'),
    path('cover-letter-generator/user-detail/<int:user_id>', coverLetters.views.user_detail, name='user-detail'),
     #     
     #     path to delete a job/user
    path('cover-letter-generator/delete-job/<int:job_id>',
         coverLetters.views.delete_job_detail, name='delete-job-detail'),
    path('cover-letter-generator/all-users/<int:user_id>',
          coverLetters.views.delete_user_detail, name='delete-user-detail'),
     #     
    path('cover-letter-generator/forms/cover-letter-form', coverLetters.views.cover_letter_form,
         name='form-template'),
    # edit job detail
    path('cover-letter-generator/forms/edit-form/<int:job_id>', coverLetters.views.edit_job_form,
         name='edit-job-form'),
         
    #  
     #     Active Forms
    path('cover-letter-generator/forms/triplebyte-form', coverLetters.views.triplebyte_message_form,
         name='triplebyte-form'),
    path('cover-letter-generator/cover-letter', coverLetters.views.cover_letter,
         name='cover-letter'),
    path('cover-letter-generator/triplebyte-cover-letter', coverLetters.views.cover_letter,
         name='non-technical-cover-letter'),
    path('cover-letter-generator/user-form', coverLetters.views.user_form,
         name='user-form'),
    path('cover-letter-generator/non-technical-cover-letter', coverLetters.views.cover_letter,
         name='non-technical-cover-letter'),
     # 
    path('cover-letter-generator/cover-letter', coverLetters.views.cover_letter,
         name='cover-letter-five'),
    
]

#     path('cover-letter-generator/user-detail', coverLetters.views.user_detail,
#          name='user-detail'),