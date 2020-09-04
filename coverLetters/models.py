from django.db import models
from phone_field import PhoneField
from multiselectfield import MultiSelectField

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



    def __str__(self):
        return 'ID ' + str(self.id) + ' - ' + self.first_name + ' ' + self.last_name + ' - date created: ' + str(self.created_date)

class Job(models.Model):
    company = models.CharField(max_length = 200, blank=True)
    title = models.CharField(max_length = 200)
    link = models.CharField(max_length = 200, blank=True)
    recruiter = models.CharField(max_length = 200,  blank=True)
    city = models.CharField(max_length = 200,  blank=True)
    top_skills = models.TextField(
         blank=True, default='Dynamic and accomplished Software Engineer with experience and expertise in')
    description = models.TextField( blank=True)
    bullet_point_one = models.TextField( blank=True)
    bullet_point_two = models.TextField( blank=True)
    bullet_point_three = models.TextField( blank=True)
    bullet_point_four = models.TextField( blank=True)
    bullet_point_five = models.TextField( blank=True)
    bullet_point_six = models.TextField( blank=True)
    bullet_point_seven = models.TextField( blank=True)
    bullet_point_eight = models.TextField( blank=True)
    pre_bullet_point_paragraph_one = models.TextField( blank=True)
    pre_bullet_point_paragraph_two = models.TextField( blank=True)
    post_bullet_point_paragraph_one = models.TextField( blank=True)
    post_bullet_point_paragraph_two = models.TextField( blank=True)
    model_template_choices = (
        ('Template 1', 'cover-letter-1'),
        ('Template 2', 'cover-letter-2'),
        ('Template 3', 'cover-letter-3'),
        ('Template 4', 'cover-letter-4'),
        ('Template 5', 'cover-letter-5')
        )
    choice_of_user = models.ForeignKey('UserDetail', on_delete=models.CASCADE, blank=True, null=True)
    template_choices = models.CharField(choices=model_template_choices, default='Template 1', max_length=20)
    modified_date = models.DateField(auto_now=True)
    created_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.company + ' ' + self.title + ' - Last Modified: ' + str(self.modified_date)
    



    
