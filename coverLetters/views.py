from django.shortcuts import render, get_object_or_404, redirect
from django.forms.models import model_to_dict
from django.core import serializers
from django.urls import path, include
from django.http import HttpResponseForbidden
from .models import Job, UserDetail
from datetime import datetime, timedelta
from.forms import CoverLetterForm, UserDetailForm, TripleByteForm
import urllib3
import json


# Helper Functions

def check_template_choice(request, template_choice, last_user, cleaned_filled_form):
    if "Standard Job Template" in template_choice:
        return render(request, 'coverLetters/cover-letter.html', {'job': cleaned_filled_form, 'last_user': last_user, 'template_choice': template_choice})
    elif "Triplebyte (message-version)" in template_choice:
        return render(request, 'coverLetters/triplebyte-cover-letter.html', {'job': cleaned_filled_form, 'last_user': last_user, 'template_choice': template_choice})
    elif "non-technical-cover-letter" in template_choice:
        return render(request, 'coverLetters/non-technical-cover-letter.html', {'job': cleaned_filled_form, 'last_user': last_user, 'template_choice': template_choice})
    elif "4" in template_choice:
        return render(request, 'coverLetters/cover-letter-four.html', {'job': cleaned_filled_form, 'last_user': last_user, 'template_choice': template_choice})
    elif "5" in template_choice:
        return render(request, 'coverLetters/cover-letter-five.html', {'job': cleaned_filled_form, 'last_user': last_user, 'template_choice': template_choice})


def date_finder(end_date=0):
    start_date = datetime.now()
    if end_date != 0:
        return (start_date - timedelta(days=end_date)).strftime('%Y-%m-%d')
    else:
        return datetime.now().strftime('%Y-%m-%d')
    

# <--------  ------->

def homepage(request):
    return render(request, 'homepage/homepage.html')

def all_jobs(request):
    jobs = Job.objects.order_by('-id')
    today = date_finder()
    week_ago = date_finder(7)
    two_months = date_finder(30)
    filtered_jobs_today = jobs.filter(
        created_date=today)
    filtered_jobs_week = jobs.filter(
        created_date__range=[week_ago, today])
    filtered_jobs = [i for i in jobs if i not in filtered_jobs_week]
    filtered_jobs_previous = jobs.exclude(
        created_date__range=[week_ago, today])
    old_jobs = jobs.exclude(
        created_date__range=[two_months, today])
    active_jobs = jobs.filter(job_stage="Active")

    for job in old_jobs:
        if "Active" not in job.job_stage:
            job.job_stage = "Rejected"
            job.save()
    return render(request, 'jobs/all-jobs.html', {
        'jobs': jobs,
        'filtered_jobs_today': filtered_jobs_today,
        'filtered_jobs_week': filtered_jobs_week,
        'filtered_jobs': filtered_jobs,
        'filtered_jobs_previous': filtered_jobs_previous,
        'active_jobs': active_jobs,
    })

def active_jobs(request):
    jobs = Job.objects.order_by('-id')
    active_jobs = jobs.filter(job_stage="Active")
    return render(request, 'jobs/active-jobs.html', {
        'active_jobs': active_jobs,
    })

def all_users(request):
    users = UserDetail.objects.all
    return render(request, 'users/all-users.html', {
        'users': users
    })

def job_detail(request, job_id):
    job_detail = get_object_or_404(Job, pk=job_id)
    user_id = int(str(job_detail.choice_of_user).split(" ")[1])
    user_detail = UserDetail.objects.get(pk=user_id)
    object = model_to_dict(Job.objects.get(pk=job_id))
    return render(request, 'jobs/job-detail.html', {'job': job_detail, 'job_object': object, 'user_detail': user_detail})

def delete_job_detail(request, job_id):
    job_detail = get_object_or_404(Job, pk=job_id)
    job_detail.delete()
    return redirect('all-jobs')
    
def delete_user_detail(request, user_id):
    user_detail = get_object_or_404(UserDetail, pk=user_id)
    user_detail.delete()
    return redirect('all-users')

def user_detail(request, user_id):
    user_detail = get_object_or_404(UserDetail, pk=user_id)
    object = model_to_dict(UserDetail.objects.get(pk=user_id))
    object_keys = list(object.keys())
    return render(request, 'users/user-detail.html', {'user': user_detail, 'object_keys': object_keys, 'object': object})

def cover_letter_form(request):
    new_form = CoverLetterForm()
    return render(request, 'coverLetters/form-template.html', {'coverLetterForm': new_form})

def triplebyte_message_form(request):
    new_form=TripleByteForm()
    return render(request, 'coverLetters/form-template.html', {'coverLetterForm': new_form})

def cover_letter(request):
    last_user = UserDetail.objects.last
    if request.method == 'POST':
        filled_form = CoverLetterForm(request.POST)
        if filled_form.is_valid():
            filled_form.save()
            cleaned_filled_form = filled_form.cleaned_data #turns the form into a dict (object)
            last_user = cleaned_filled_form['choice_of_user']
            template_choice = cleaned_filled_form['template_choices']
            # Checks to see what template to render for the cover letter -->
            return check_template_choice(request, template_choice,
                                  last_user, cleaned_filled_form)
            # <--------  ------->
    else:
        form = CoverLetterForm()
        return render(request, 'coverLetters/form-template.html', {'coverLetterForm': form})
    print(filled_form.errors.as_json(escape_html=False))
    return HttpResponseForbidden("Duplicate Data - See Terminal Log")

def edit_job_form(request, job_id):
    job_detail = get_object_or_404(Job, pk=job_id)
    form = CoverLetterForm(instance=job_detail)
    if request.method == 'POST':
        filled_form = CoverLetterForm(request.POST, instance = job_detail)
        if filled_form.is_valid():
            filled_form.save()
            form = filled_form
            job_detail = get_object_or_404(Job, pk=job_id)
            user_id = int(str(job_detail.choice_of_user).split(" ")[1])
            user_detail = UserDetail.objects.get(pk=user_id)
            object = model_to_dict(Job.objects.get(pk=job_id))
            return render(request, 'jobs/job-detail.html', {'job': job_detail, 'job_object': object, 'user_detail': user_detail})
    return render(request, 'coverLetters/edit-template-form.html', {'coverLetterForm': form, 'job': job_detail,})

def user_form(request):
    if request.method == 'POST':
        user_filled_form = UserDetailForm(request.POST)
        if user_filled_form.is_valid():
            user_filled_form.save()
            users = UserDetail.objects.all
            return render(request, 'users/all-users.html', {'users': users})
    else:
        form = UserDetailForm()
        return render(request, 'users/user-form.html', {'userForm': form})




