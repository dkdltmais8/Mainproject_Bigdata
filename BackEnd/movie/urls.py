from django.urls import path
from . import views

urlpatterns = [
    path('survey', views.get_survey_movie),
    path('toprated', views.get_toprated_movie),
    # path('latest', views.get_latest_movie),
    path('nowplaying', views.get_nowplaying_movie),
    path('upcoming', views.get_upcoming_movie),
    path('movieti/<result>', views.get_movieti_result),
    path('<int:movieid>', views.get_movie_detail),
    path('<int:movieid>/trailer', views.get_movie_trailer),
    path('<int:movie>/comment', views.create_comment),
]
