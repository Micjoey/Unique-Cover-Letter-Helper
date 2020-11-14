from django.contrib import admin
from .models import Job, UserDetail

admin.site.register(Job)
admin.site.register(UserDetail)


class JobsAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
