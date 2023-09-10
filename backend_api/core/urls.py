from django.urls import path, include
from . import views
from core.views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'todos', TodoViewSet)

urlpatterns =[
    path('', include(router.urls)),
]