from django.db import models


class Job(models.Model):
    company = models.CharField(max_length = 200, null=True, blank=True)
    title = models.CharField(max_length = 200)
    link = models.CharField(max_length = 200, null=True, blank=True)
    recruiter = models.CharField(max_length = 200, null=True, blank=True)
    city = models.CharField(max_length = 200, null=True, blank=True)
    top_skills = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    bullet_point_one = models.TextField(null=True, blank=True)
    bullet_point_two = models.TextField(null=True, blank=True)
    bullet_point_three = models.TextField(null=True, blank=True)
    bullet_point_four = models.TextField(null=True, blank=True)
    bullet_point_five = models.TextField(null=True, blank=True)
    bullet_point_six = models.TextField(null=True, blank=True)
    bullet_point_seven = models.TextField(null=True, blank=True)
    bullet_point_eight = models.TextField(null=True, blank=True)
    pre_bullet_point_paragraph_one = models.TextField(null=True, blank=True)
    pre_bullet_point_paragraph_two = models.TextField(null=True, blank=True)
    post_bullet_point_paragraph_one = models.TextField(null=True, blank=True)
    post_bullet_point_paragraph_two = models.TextField(null=True, blank=True)
    
    modified_date = models.DateField(auto_now=True)
    created_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.company + ' ' + self.title + ' - Last Modified: ' + str(self.modified_date)
    


class User(models.Model):
    first_name = models.CharField(max_length=200, blank=False)
    middle_name = models.CharField(max_length=200, null=True, blank=True)
    last_name = models.CharField(max_length=200, blank=False)
    email = models.EmailField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    street_address = models.CharField(blank=True, null=False, max_length=200)
    # if not self.street_address:
    city_address = models.CharField(blank=True, null=False, max_length=200,)
    state_address = models.CharField(blank=True, null=False, max_length=200,)
    zip_code = models.CharField(blank=True, null=False, max_length=200,)
    # else:
        # city_address = models.CharField()
        # state_address = models.CharField()
        # zip_code = models.CharField()

    def __str__(self):
        return self.first_name + ' ' + self.last_name
    
