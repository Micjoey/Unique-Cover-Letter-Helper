from django.shortcuts import render, get_object_or_404
from .models import Job, UserDetail
from.forms import CoverLetterForm, UserDetailForm
from django.forms.models import model_to_dict


def homepage(request):
    return render(request, 'homepage/homepage.html')


def all_jobs(request):
    jobs = Job.objects.order_by('created_date')
    return render(request, 'jobs/all-jobs.html', {
        'jobs': jobs
    })


def all_users(request):
    users = UserDetail.objects.all
    return render(request, 'users/all-users.html', {
        'users': users
    })


def job_detail(request, job_id):
    job_detail = get_object_or_404(Job, pk=job_id)
    object = model_to_dict(Job.objects.get(pk=job_id))
    object_keys = list(object.keys())
    return render(request, 'jobs/job-detail.html', {'job': job_detail, 'object_keys': object_keys, 'object': object})


def user_detail(request, user_id):
    user_detail = get_object_or_404(UserDetail, pk=user_id)
    object = model_to_dict(UserDetail.objects.get(pk=user_id))
    object_keys = list(object.keys())
    return render(request, 'users/user-detail.html', {'user': user_detail, 'object_keys': object_keys, 'object': object})


def cover_letter_form(request):
    if request.method == 'POST':
        filled_form = CoverLetterForm(request.POST)
        if filled_form.is_valid():
            filled_form.save()
            return render(request, 'coverLetters/cover-letter-form.html', {'info': filled_form})
    else:
        form = CoverLetterForm()
        return render(request, 'coverLetters/cover-letter-form.html', {'coverLetterForm': form})


def cover_letter(request):
    if request.method == 'POST':
        filled_form = CoverLetterForm(request.POST)
        if filled_form.is_valid():
            filled_form.save()
            filled_form = filled_form.cleaned_data
            return render(request, 'coverLetters/cover-letter.html', {'job': filled_form})
    else:
        form = CoverLetterForm()
        return render(request, 'coverLetters/cover-letter-form.html', {'coverLetterForm': form})


def user_form(request):
    if request.method == 'POST':
        user_filled_form = UserDetailForm(request.POST)
        if user_filled_form.is_valid():
            user_filled_form.save()
            return render(request, 'users/user-form.html', {'info': user_filled_form})
    else:
        form = UserDetailForm()
        return render(request, 'users/user-form.html', {'userForm': form})
