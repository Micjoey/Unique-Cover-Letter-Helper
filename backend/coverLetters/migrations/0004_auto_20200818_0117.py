# Generated by Django 3.0.3 on 2020-08-18 01:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coverLetters', '0003_auto_20200818_0116'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='post_bullet_point_paragraph_one',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='job',
            name='post_bullet_point_paragraph_two',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='job',
            name='pre_bullet_point_paragraph_one',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='job',
            name='pre_bullet_point_paragraph_two',
            field=models.TextField(blank=True, null=True),
        ),
    ]