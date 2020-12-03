from django.contrib import admin
from .models import Job, User
# from .models import Job, UserDetail, User

admin.site.register(Job)
# admin.site.register(UserDetail)
admin.site.register(User)


class JobsAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
