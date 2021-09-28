from rest_framework import serializers
from api.models import Movie, Movieti
from accounts.models import Comment


class MovieSurveyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('tmdb_id', 'title', 'poster_path')


class MovieDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('tmdb_id', 'title', 'genre', 'cast', 'keywords', 'overview',
                  'release_date', 'poster_path', 'vote_average')


class MovietiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movieti
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
