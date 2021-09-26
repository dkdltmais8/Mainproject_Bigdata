from django.db import models
from django.http import response
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers, status
import requests
import random
from api.models import Movie, Movieti
from .serializers import MovieSurveyListSerializer

# Create your views here.


@api_view(['GET'])
def get_survey_movie(request):
    # front연결확인을 위한 로직
    movie_list = [{"title": "윔피 키드 3", "poster_path": "/7pTvjELxw0f0E6sUPGtPEl4WD0S.jpg"}, {"title": "텍사스 전기톱 학살 3", "poster_path": "/z3Bibks7fKsUBVR2yJ1vaJHx7Bf.jpg"}, {"title": "더 웨이", "poster_path": "/4wJb8HLMWaJXrYznXNf7eqFUJKL.jpg"}, {"title": "태양의 제국", "poster_path": "/gEaCzjwHoPgyQFcwHql7o5YLHAU.jpg"}, {"title": "라푼젤", "poster_path": "/vhBcHM7hrFqTwQMxeNTVgVXA9Ue.jpg"},
                  {"title": "아트 오브 겟팅 바이", "poster_path": "/pGdb3GSZgPZ29IIlkgGiX9iaAm5.jpg"}, {"title": "런", "poster_path": "/swMFgTEcDUz7MCvWfYIIiZ8PatU.jpg"}, {"title": "루시 인 더 스카이", "poster_path": "/ofhOB6EGSBqzGHA0MStMx9zWnML.jpg"}, {"title": "메이즈 러너: 데스 큐어", "poster_path": "/xTOZbj6y3sTa83YH1dx82Ev7VlA.jpg"}, {"title": "극장판 유희왕: 시공을 초월한 우정", "poster_path": "/rCl6osOEvz8zmSpo733LNpexJCP.jpg"}]
    return Response(movie_list, status=status.HTTP_200_OK)

    # 쿼리셋 형태를 리스트로 변환
    # movie_list = list(Movie.objects.values('title', 'poster_path'))

    # random_list = random.sample(movie_list, 20)
    # # print(random_list)

    # serializer = MovieSurveyListSerializer(random_list, many=True)
    # return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_movieti_result(request, result):
    return Response(result, status=status.HTTP_200_OK)
