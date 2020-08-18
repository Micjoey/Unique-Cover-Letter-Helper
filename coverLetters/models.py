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
    


class CoverLetter(models.Model):
    cover_letter_title = models.CharField(
        max_length=200, null=True, blank=False)
    company = models.CharField(max_length=200, null=True, blank=True)
    job_title = models.CharField(max_length=200)
    job_id = models.ForeignKey(Job, default=1, on_delete=models.CASCADE)
    cover_letter = models.TextField(null=False, blank=False,)

    def __str__(self):
        return self.cover_letter_title
    
