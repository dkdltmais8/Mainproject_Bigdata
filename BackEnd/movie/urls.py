from django.urls import path
from . import views

urlpatterns = [
    path('survey', views.get_survey_movie),
    path('toprated', views.get_toprated_movie),
    path('nowplaying', views.get_nowplaying_movie),
    path('upcoming', views.get_upcoming_movie),
    path('movieti/<result>', views.get_movieti_result),
    path('get-cast', views.get_cast),
]
