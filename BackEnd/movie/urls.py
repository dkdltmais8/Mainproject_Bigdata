from django.urls import path
from . import views

urlpatterns = [
    path('survey', views.get_survey_movie),
]
