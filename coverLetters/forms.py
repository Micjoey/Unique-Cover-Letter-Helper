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
            'bullet_point_one',
            'bullet_point_two',
            'bullet_point_three',
            'bullet_point_four',
            'bullet_point_five',
            'bullet_point_six',
            'bullet_point_seven',
            'bullet_point_eight',
        ]
        labels = {'title': 'Title'}
        
        widgets = {
            # 'bullet_point_one': forms.TextInput,
            # 'top_skills': forms.TextInput,
            # 'bullet_point_two': forms.TextInput,
            # 'bullet_point_three': forms.TextInput,
            # 'bullet_point_four': forms.TextInput,
            # 'bullet_point_five': forms.TextInput,
            # 'bullet_point_six': forms.TextInput,
            # 'bullet_point_seven': forms.TextInput,
            # 'bullet_point_eight': forms.TextInput,
        }
        formId = forms.CharField(widget=forms.HiddenInput())


        
