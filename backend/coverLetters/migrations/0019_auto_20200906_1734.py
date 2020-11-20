# Generated by Django 3.1 on 2020-09-06 17:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coverLetters', '0018_auto_20200904_1850'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='userdetail',
            options={'ordering': ['-created_date']},
        ),
        migrations.RemoveField(
            model_name='job',
            name='choice_of_user',
        ),
        migrations.AddField(
            model_name='job',
            name='job_posting_website',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
