from django.shortcuts import render, get_object_or_404
from .models import Job
from.forms import CoverLetterForm
from django.forms.models import model_to_dict

def all_jobs(request):
    jobs = Job.objects
    return render(request, 'coverLetters/all-jobs.html', {
        'jobs': jobs
    })


def cover_letter_form(request):
    if request.method == 'POST':
        filled_form = CoverLetterForm(request.POST)
        if filled_form.is_valid():
            filled_form.save()
            note = 'Thank you for filling out! Filling out form for %s and %s !' %(
                filled_form.cleaned_data['company'],
                filled_form.cleaned_data['title'],
            )
            new_form = CoverLetterForm()
            return render(request, 'coverLetters/cover-letter-form.html', {'coverLetterForm': new_form, 'note': note})
    else:
        form = CoverLetterForm()
        return render(request, 'coverLetters/cover-letter-form.html', {'coverLetterForm': form})


def cover_letter(request, info):
    return render(request, 'coverLetters/cover-letters.html', {'cover_letter_detail': info})


def detail(request, job_id):
    job_detail = get_object_or_404(Job, pk=job_id)
    object = model_to_dict(Job.objects.get(pk=job_id))
    object_keys = list(object.keys())
    return render(request, 'coverLetters/job-detail.html', {'job': job_detail, 'object_keys': object_keys, 'object': object})

def homepage(request):
    return render(request, 'coverLetters/homepage.html')
