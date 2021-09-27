from django.urls import path
from . import views

urlpatterns = [
    path('survey', views.get_survey_movie),
    path('movieti/<result>', views.get_movieti_result),
]
