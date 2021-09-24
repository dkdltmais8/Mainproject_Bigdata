from django.db import models
from django.http import response
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers, status
import requests
import random
from api.models import Movie
from .serializers import MovieSurveyListSerializer

# Create your views here.
@api_view(['GET'])
def get_survey_movie(request):
    # 쿼리셋 형태를 리스트로 변환
    movie_list = list(Movie.objects.values('title', 'poster_path'))

    random_list = random.sample(movie_list, 20)
    # print(random_list)
    
    serializer = MovieSurveyListSerializer(random_list, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)