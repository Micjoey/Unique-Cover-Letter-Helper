from django.db import models

class Job(models.Model):
    company = models.CharField(max_length = 200, null=True, blank=True)
    title = models.CharField(max_length = 200)
    link = models.CharField(max_length = 200, null=True, blank=True)
    top_skills = models.TextField(null=True, blank=True)
    extra_line_one = models.TextField(null=True, blank=True)
    extra_line_two = models.TextField(null=True, blank=True)
    extra_line_three = models.TextField(null=True, blank=True)
    extra_line_four = models.TextField(null=True, blank=True)
    extra_line_five = models.TextField(null=True, blank=True)
    extra_line_six = models.TextField(null=True, blank=True)
    extra_line_seven = models.TextField(null=True, blank=True)
    extra_line_eight = models.TextField(null=True, blank=True)
    modified_date = models.DateField(auto_now=True)
    created_date = models.DateField(auto_now_add=True)

    def __str__(self):
        company = 'company'
        created_date = 'created_date'
        modified_date = 'modified_date'
        company_and_title = {
            self.title: {
                company: self.company,
                created_date: self.created_date,
                modified_date: self.modified_date
            }
        }
        
        return company_and_title
    


class CoverLetter(models.Model):
    cover_letter_title = models.CharField(
        max_length=200, null=False, blank=False)
    company = models.CharField(max_length=200, null=True, blank=True)
    job_title = models.CharField(max_length=200)
    job_id = models.ManyToManyField(Job)
    cover_letter = models.TextField(null=False, blank=False)

    def __str__(self):
        return self.cover_letter_title
    
