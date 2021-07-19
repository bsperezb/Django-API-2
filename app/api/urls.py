
from django.urls import path, include
from .views import apiview_based, apiview_based2, Viewsets_based
from rest_framework.routers import DefaultRouter

router1 = DefaultRouter()
router1.register('', Viewsets_based, basename='')


urlpatterns = [
    path('apiview/', apiview_based.as_view()),
    path('apiview/<int:id>/', apiview_based2.as_view()),

    path('viewsets/', include(router1.urls)),
    path('viewsets/<int:pk>/', include(router1.urls)),


]
