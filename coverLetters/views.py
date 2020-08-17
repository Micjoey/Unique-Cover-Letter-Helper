from django.shortcuts import render, get_object_or_404
from .models import Job
from.forms import CoverLetterForm

def all_jobs(request):
    jobs = Job.objects
    return render(request, 'coverLetters/all-jobs.html', {
        'jobs': jobs
    })

def cover_letter_form(request):
    form = CoverLetterForm()
    return render(request, 'coverLetters/cover-letter-form.html', {'coverLetterForm': form})

def detail(request, job_id):
    job_detail = get_object_or_404(Job, pk=job_id)
    return render(request, 'coverLetters/job-detail.html', {'job': job_detail})

def homepage(request):
    return render(request, 'coverLetters/homepage.html')
