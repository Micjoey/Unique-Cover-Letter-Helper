# Generated by Django 3.1 on 2020-09-12 21:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('coverLetters', '0030_auto_20200911_2032'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='choice_of_user',
            field=models.ForeignKey(blank=True, default=6, null=True, on_delete=django.db.models.deletion.CASCADE, to='coverLetters.userdetail'),
        ),
        migrations.AlterField(
            model_name='job',
            name='modified_date',
            field=models.DateField(auto_now_add=True),
        ),
    ]