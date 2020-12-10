from rest_framework.routers import DefaultRouter
from coverLetters.api.views import JobViewSet, UserViewSet, DefaultInfoViewSet



router = DefaultRouter()
router.register(r'jobs', JobViewSet, basename='jobs')
router.register(r'users', UserViewSet, basename='users')
router.register(r'defaultInfo', DefaultInfoViewSet, basename='defaultInfo')
urlpatterns = router.urls
