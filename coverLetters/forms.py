from django import forms
from django.forms import ModelForm
from .models import Job, UserDetail
from django.forms.models import model_to_dict
import datetime
class CoverLetterForm(ModelForm):
    class Meta:
        model = Job
        fields = '__all__'
        labels = {'position_title': 'Position title'}
        widgets = {
            # 'template_choices': forms.Select(), 
            'template_choices': forms.RadioSelect(), 
        }
        
        formId = forms.CharField(widget=forms.HiddenInput())

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['city'].initial = 'San Francisco'
        self.fields['choice_of_user'].initial = UserDetail.objects.first().id
        self.fields['job_posting_website'].initial = 'LinkedIn'
        self.fields['form_creation_date'].initial = datetime.date.today()
        self.fields['form_creation_date'].widget = forms.HiddenInput()


class TripleByteForm(ModelForm):
    class Meta:
        model = Job
        fields = '__all__'
        labels = {'position_title': 'Position title'}
        widgets = {
            'template_choices': forms.Select(), 
        }
        formId = forms.CharField(widget=forms.HiddenInput())
        createdDate = forms.DateField(
            initial=datetime.date.today)


    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['city'].initial = 'San Francisco'
        self.fields['choice_of_user'].initial = UserDetail.objects.last().id 
        self.fields['template_choices'].initial = 'Triplebyte (message-version)'

class UserDetailForm(ModelForm):
    class Meta:
        model = UserDetail
        fields = '__all__'

