from rest_framework import serializers
from api.models import Movie, Movieti


class MovieSurveyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('tmdb_id', 'title', 'poster_path')
