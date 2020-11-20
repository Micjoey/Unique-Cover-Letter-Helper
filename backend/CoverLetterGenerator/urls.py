from django.contrib import admin
from django.urls import path, include
from django.views.decorators.cache import cache_page
import coverLetters.views

urlpatterns = [
    path('admin/', admin.site.urls, name='Admin-site'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('coverLetters.api.urls')),
    # path('', coverLetters.views.homepage, name='homepage'),

    #  #     all users/jobs
#     path('cover-letter-generator/all-jobs/', coverLetters.views.all_jobs, name='all-jobs'),
#     path('cover-letter-generator/all-users', coverLetters.views.all_users, name='all-users'),
#     path('cover-letter-generator/all-active-jobs',
#          coverLetters.views.active_jobs, name='active-jobs'),
#      #
#      #  job/user detail
#     path('cover-letter-generator/job-detail/<int:job_id>', cache_page(60 * 5)(coverLetters.views.job_detail), name='job-detail'),
#     path('cover-letter-generator/user-detail/<int:user_id>', coverLetters.views.user_detail, name='user-detail'),
#      #     
#      #     path to delete a job/user
#     path('cover-letter-generator/delete-job/<int:job_id>',
#          coverLetters.views.delete_job_detail, name='delete-job-detail'),
#     path('cover-letter-generator/all-users/<int:user_id>',
#           coverLetters.views.delete_user_detail, name='delete-user-detail'),
#      #     
#     path('cover-letter-generator/forms/cover-letter-form', coverLetters.views.cover_letter_form,
#          name='form-template'),
#     # edit job detail
#     path('cover-letter-generator/forms/edit-form/<int:job_id>', coverLetters.views.edit_job_form,
#          name='edit-job-form'),
         
#     #  
#      #     Active Forms
#     path('cover-letter-generator/user-form', coverLetters.views.user_form,
#          name='user-form'),
#     path('cover-letter-generator/cover-letter', coverLetters.views.cover_letter,
#          name='cover-letter'),
#     path('cover-letter-generator/forms/triplebyte-form', coverLetters.views.triplebyte_message_form,
#          name='triplebyte-form'),

    
]

