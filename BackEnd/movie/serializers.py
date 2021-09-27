from rest_framework import serializers
from api.models import Movie, Movieti


class MovieSurveyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('tmdb_id', 'title', 'poster_path')


class MovieDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('tmdb_id', 'title', 'genre', 'cast', 'keywords', 'overview',
                  'release_date', 'poster_path')


class MovietiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movieti
        fields = '__all__'
