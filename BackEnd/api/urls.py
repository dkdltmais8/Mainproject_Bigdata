from django.urls import path
from . import views

urlpatterns = [
    path('get-movie/', views.get_movie_list),
]