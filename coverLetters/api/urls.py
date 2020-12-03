from rest_framework.routers import DefaultRouter
from coverLetters.api.views import JobViewSet, UserViewSet



router = DefaultRouter()
router.register(r'jobs', JobViewSet, basename='jobs')
router.register(r'users', UserViewSet, basename='users')
urlpatterns = router.urls
