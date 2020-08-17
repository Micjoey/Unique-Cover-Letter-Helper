from django import forms
from .models import Job

class CoverLetterForm(forms.ModelForm):
    class Meta:
        model = Job
        fields = ['company', 
            'title', 
            'link', 
            'top_skills',
            'extra_line_one',
            'extra_line_two',
            'extra_line_three',
            'extra_line_four',
            'extra_line_five',
            'extra_line_six',
            'extra_line_seven',
            'extra_line_eight',
        ]
        
