# Generated by Django 3.1 on 2020-12-01 18:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('coverLetters', '0004_auto_20201201_1041'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='job',
            unique_together={('link', 'position_title', 'belongs_to_user')},
        ),
    ]