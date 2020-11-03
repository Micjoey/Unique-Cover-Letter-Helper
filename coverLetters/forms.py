from django import forms
from django.forms import ModelForm
from .models import Job, UserDetail
from django.forms.models import model_to_dict
from datetime import datetime
class CoverLetterForm(ModelForm):
    job_posting_website = forms.CharField(required=False)
    class Meta:
        model = Job
        fields = '__all__'
        labels = {'position_title': 'Position title'}
        widgets = {
            'template_choices': forms.Select(), 
            # 'template_choices': forms.RadioSelect(), 
        }




    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['city'].initial = 'San Francisco'
        self.fields['choice_of_user'].initial = UserDetail.objects.first().id
        self.fields['template_choices'].initial = 'non-technical-cover-letter'
        self.fields['job_posting_website'].initial = 'LinkedIn'
        self.fields['bullet_point_one'].initial = 'Over the last five years, I have worked in multiple team-based, customer-oriented, professional roles. '
        self.fields['bullet_point_two'].initial = 'For sixteen years on competitive soccer teams, I practiced the art of communicating in a fast moving environment, including four years of college D3 soccer. '
        self.fields['bullet_point_three'].initial = 'My passion for competitive soccer has taught me to learn from my mistakes using constructive feedback to improve future action.'
        self.fields['bullet_point_four'].initial = 'I continually strive for opportunities to improve my skills and have the opportunity to problem-solve.'
        self.fields['bullet_point_five'].initial = 'A passion for reading books on communication, relationship building, and leadership allow me to learn continually.'
        self.fields['form_creation_date'].initial = datetime.now().strftime(
            '%B %dth, %Y')
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

     
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['city'].initial = 'San Francisco'
        self.fields['choice_of_user'].initial = UserDetail.objects.last().id 
        self.fields['template_choices'].initial = 'Triplebyte (message-version)'
        self.fields['job_posting_website'].initial = 'Triplebyte'
        self.fields['form_creation_date'].initial = datetime.now().strftime(
            '%B %dth, %Y')
        self.fields['form_creation_date'].widget = forms.HiddenInput()

class UserDetailForm(ModelForm):
    class Meta:
        model = UserDetail
        fields = '__all__'

