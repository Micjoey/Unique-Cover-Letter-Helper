from django.db import models
from django.db.models import Q, UniqueConstraint
from phone_field import PhoneField
from multiselectfield import MultiSelectField
import datetime
from datetime import datetime

__all__ = ['CheckConstraint', 'UniqueConstraint']
class UserDetail(models.Model):
    first_name = models.CharField(max_length=200, blank=False)
    middle_name = models.CharField(max_length=200,  blank=True)
    last_name = models.CharField(max_length=200, blank=False)
    preferred_name = models.CharField(max_length=200, blank=True)
    phone_number = PhoneField(blank=True)
    email = models.EmailField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    portfolio_website = models.URLField(blank=True, null=True)
    street_address = models.CharField(blank=True, max_length=200)
    city_address = models.CharField(blank=True, max_length=200,)
    state_address = models.CharField(blank=True, max_length=200,)
    zip_code = models.CharField(blank=True, max_length=200,)
    modified_date = models.DateField(auto_now=True, blank=True)
    created_date = models.DateField(auto_now_add=True, blank=True)
    

    class Meta:
        ordering = ['-modified_date']


    def __str__(self):
        return 'ID ' + str(self.id) + ' - ' + self.first_name + ' ' + self.last_name + ' - date created: ' + str(self.created_date)

class Job(models.Model):
    job_template_choices = (
        ('Standard Job Template', 'Standard Job Template'),
        ('Triplebyte (message-version)', 'Triplebyte (message-version)'),
        ('Non-technical Cover Letter', 'non-technical-cover-letter'),
        ('Template 4', 'cover-letter-4'),
        ('Template 5', 'cover-letter-5')
    )
    form_creation_date = models.CharField(
        max_length=100, blank=True, default=datetime.now().strftime('%B %dth, %Y'))
    template_choices = models.CharField(
        choices=job_template_choices, default='Standard Job Template', max_length=100, null=False, blank='False')
    choice_of_user = models.ForeignKey(
        'UserDetail', on_delete=models.CASCADE, blank=True, null=True, default=UserDetail.objects.last().id)
    job_posting_website = models.CharField(max_length=200,)
    position_title = models.CharField(max_length = 200)
    company = models.CharField(max_length = 200, blank=True)
    city = models.CharField(max_length = 200,  blank=True)
    link = models.CharField(max_length = 200)
    recruiter = models.CharField(max_length = 200,  blank=True)
    description = models.TextField( blank=True)
    pre_bullet_point_paragraph_one = models.TextField( blank=True)
    pre_bullet_point_paragraph_two = models.TextField( blank=True)
    top_skills = models.TextField(
         blank=True, default='Dynamic and accomplished Software Engineer with experience and expertise in')
    bullet_point_one = models.TextField( blank=True)
    bullet_point_two = models.TextField( blank=True)
    bullet_point_three = models.TextField( blank=True)
    bullet_point_four = models.TextField( blank=True)
    bullet_point_five = models.TextField( blank=True)
    bullet_point_six = models.TextField( blank=True)
    bullet_point_seven = models.TextField( blank=True)
    bullet_point_eight = models.TextField( blank=True)
    post_bullet_point_paragraph_one = models.TextField( blank=True)
    post_bullet_point_paragraph_two = models.TextField( blank=True)
    modified_date = models.DateField(auto_now=True)
    created_date = models.DateField(auto_now_add=True)
    


    
    class Meta:
        unique_together = ('link', 'template_choices', 'position_title')


    def __str__(self):
        return self.company + ' ' + self.position_title + ' - Last Modified: ' + str(self.modified_date) + ' - ' + self.template_choices
    



    
