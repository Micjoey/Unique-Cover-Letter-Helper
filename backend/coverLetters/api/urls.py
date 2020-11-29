from rest_framework.routers import DefaultRouter
from coverLetters.api.views import JobViewSet, UserDetailViewSet



router = DefaultRouter()
router.register(r'jobs', JobViewSet, basename='jobs')
router.register(r'user-details', UserDetailViewSet, basename='user-details')
urlpatterns = router.urls
