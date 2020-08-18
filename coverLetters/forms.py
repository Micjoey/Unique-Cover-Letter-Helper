from django import forms
from .models import Job

class CoverLetterForm(forms.ModelForm):
    class Meta:
        model = Job
        fields = ['company', 
            'city',
            'title', 
            'link', 
            'description',
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
        labels = {'title': 'Title'}
        widgets = {
            # 'extra_line_one': forms.TextInput,
            # 'top_skills': forms.TextInput,
            # 'extra_line_two': forms.TextInput,
            # 'extra_line_three': forms.TextInput,
            # 'extra_line_four': forms.TextInput,
            # 'extra_line_five': forms.TextInput,
            # 'extra_line_six': forms.TextInput,
            # 'extra_line_seven': forms.TextInput,
            # 'extra_line_eight': forms.TextInput,
        }
        formId = forms.CharField(widget=forms.HiddenInput())

        
