from django.contrib import admin
from .models import Job, DefaultInfo, User

admin.site.register(Job)
admin.site.register(DefaultInfo)
admin.site.register(User)


class JobsAdmin(admin.ModelAdmin):
    readonly_fields = ('id', 'form_creation_date', 'modified_date')
class DefaultInfosAdmin(admin.ModelAdmin):
    readonly_fields = ('id', 'form_creation_date', 'modified_date')
