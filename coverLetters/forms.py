from django import forms
from django.forms import ModelForm
from .models import Job, UserDetail
from django.forms.models import model_to_dict

class CoverLetterForm(ModelForm):

    class Meta:
        model = Job
        fields = '__all__'
        labels = {'position_title': 'Position title'}
        widgets = {
            'template_choices': forms.Select(), 
        }
        
        formId = forms.CharField(widget=forms.HiddenInput())

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['city'].initial = 'San Francisco'
        self.fields['choice_of_user'].initial = UserDetail.objects.first().id

class UserDetailForm(ModelForm):
    class Meta:
        model = UserDetail
        fields = ['first_name',
            'middle_name',
            'last_name',
            'preferred_name',
            'email',
            'linkedin',
            'github',
            'portfolio_website',
            'street_address',
            'city_address',
            'state_address',
            'zip_code',
        ]

