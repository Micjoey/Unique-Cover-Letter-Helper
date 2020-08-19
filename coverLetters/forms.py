from django import forms
from .models import Job, User

class CoverLetterForm(forms.ModelForm):
    class Meta:
        model = Job
        fields = ['company', 
            'city',
            'title', 
            'link', 
            'recruiter',
            'description',
            'pre_bullet_point_paragraph_one',
            'pre_bullet_point_paragraph_two',
            'top_skills',
            'bullet_point_one',
            'bullet_point_two',
            'bullet_point_three',
            'bullet_point_four',
            'bullet_point_five',
            'bullet_point_six',
            'bullet_point_seven',
            'bullet_point_eight',
            'post_bullet_point_paragraph_one',
            'post_bullet_point_paragraph_two',
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

class UserForm(forms.ModelForm):
    class meta:
        model = User
        fields = [
            'first_name',
            'middle_name',
            'last_name',
            'preferred_name'
            'email',
            'linkedin',
            'github',
            'portfolio',
            'street_address',
            'city_address',
            'state_address',
            'zip_code'
        ]
        
