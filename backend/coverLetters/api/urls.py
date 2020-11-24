from rest_framework.routers import DefaultRouter
from coverLetters.api.views import JobViewSet



router = DefaultRouter()
router.register(r'jobs', JobViewSet, basename='jobs')
urlpatterns = router.urls
