# Generated by Django 3.1.4 on 2020-12-10 21:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('coverLetters', '0016_auto_20201210_1333'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='default_info',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='coverLetters.defaultinfo'),
        ),
    ]
