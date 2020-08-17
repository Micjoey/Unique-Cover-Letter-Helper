from django import forms
from .models import Job

class CoverLetterForm(forms.Form):
    company = forms.CharField(label="Company Name", empty_value=True)
    title = forms.CharField(label="Job Title", empty_value=True)

        
