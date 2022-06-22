from django.urls import path
from .views import home


urlpatterns = [

    path('<int:room_name>/', home, name="home"),
]
