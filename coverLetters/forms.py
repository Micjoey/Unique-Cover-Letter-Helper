from django import forms
from .models import Job

class CoverLetterForm(forms.Form):
    company_name = forms.CharField(label="Company Name")
    job_title = forms.CharField(label="Job Title")

        
