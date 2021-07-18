
from django.urls import path, include
from .views import ConsumeView

urlpatterns = [
    path('', ConsumeView,),
]
