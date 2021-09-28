import json
from django.db import models
from django.http import response
from django.shortcuts import get_object_or_404, render
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
import requests
import random
from api.models import Movie, Movieti
from accounts.models import Comment
from .serializers import MovieSurveyListSerializer, MovietiSerializer, MovieDetailSerializer

# Create your views here.


@api_view(['GET'])
def get_survey_movie(request):
    # front연결확인을 위한 로직
    movie_list = [{"tmdb_id": 926, "title": "갤럭시 퀘스트", "poster_path": "/fZXSwgZknp81vmciTb86rw0MejV.jpg"}, {"tmdb_id": 458220, "title": "팔머", "poster_path": "/xSDdRAjxKAGi8fUBLOqSrBhJmF0.jpg"}, {"tmdb_id": 387426, "title": "옥자",
                                                                                                                                                                                                   "poster_path": "/miHNA5DcheO7ax2qon9CmC7qa9j.jpg"}, {"tmdb_id": 1677, "title": "레이", "poster_path": "/fIC2stYa40yD1TpBVyLXQfL2X3T.jpg"}, {"tmdb_id": 429191, "title": "판타스틱 우먼", "poster_path": "/2msHctIBQFNnjeHMmgKLe9UldLK.jpg"}]

    return Response(movie_list, status=status.HTTP_200_OK)

    # 쿼리셋 형태를 리스트로 변환
    # movie_list = list(Movie.objects.values('tmdb_id', 'title', 'poster_path'))

    # random_list = random.sample(movie_list, 20)
    # # print(random_list)

    # serializer = MovieSurveyListSerializer(random_list, many=True)
    # return Response(serializer.data, status=status.HTTP_200_OK)


url = 'https://api.themoviedb.org/3/movie'
api_key = 'e65e678451c2b671218a36fb34998488'


@api_view(['GET'])
def get_toprated_movie(request):
    # 영화 id, title, poster만 담아 보낼것
    result = []
    for i in range(1, 3):
        response = requests.get(
            f'{url}/top_rated/?api_key={api_key}&language=ko-KR&page={i}&region=KR')
        temp = response.json().get('results')
        for j in range(len(temp)):
            temp2 = {}
            temp2['tmdb_id'] = temp[j].get('id')
            temp2['title'] = temp[j].get('title')
            temp2['poster_path'] = temp[j].get('poster_path')
            result.append(temp2)
    return Response(result, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_nowplaying_movie(request):
    response = requests.get(
        f'{url}/now_playing/?api_key={api_key}&language=ko-KR&page=1&region=KR')
    temp = response.json().get('results')
    result = []
    for i in range(len(temp)):
        temp2 = {}
        temp2['tmdb_id'] = temp[i].get('id')
        temp2['title'] = temp[i].get('title')
        temp2['poster_path'] = temp[i].get('poster_path')
        result.append(temp2)
    print(result)
    return Response(result, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_upcoming_movie(request):
    response = requests.get(
        f'{url}/upcoming/?api_key={api_key}&language=ko-KR&page=1&region=KR')
    temp = response.json().get('results')
    result = []
    for i in range(len(temp)):
        temp2 = {}
        temp2['tmdb_id'] = temp[i].get('id')
        temp2['title'] = temp[i].get('title')
        temp2['poster_path'] = temp[i].get('poster_path')
        result.append(temp2)
    print(result)
    return Response(result, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_movie_detail(request, movieid):
    movie = get_object_or_404(Movie, tmdb_id=movieid)
    serializers = MovieDetailSerializer(movie)
    return Response(serializers.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_movie_trailer(request, movieid):
    response = requests.get(
        f'{url}/{movieid}/videos?api_key={api_key}&language=ko-KR')
    temp = response.json().get('results')

    find = False
    result = 'https://www.youtube.com/embed/'
    for i in range(len(temp)):
        if temp[i].get('type') == 'Trailer':
            result += temp[i].get('key')
            find = True
            break

    return Response(result, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_movie_similar(request, movieid):
    response = requests.get(
        f'{url}/{movieid}/similar?api_key={api_key}&language=ko-KR&page=1')
    temp = response.json().get('results')
    result = []
    for i in range(len(temp)):
        if temp[i].get('overview'):
            if temp[i].get('release_date'):
                temp2 = {}
                temp2['tmdb_id'] = temp[i].get('id')
                temp2['title'] = temp[i].get('title')
                temp2['poster_path'] = temp[i].get('poster_path')
                result.append(temp2)
                if(len(temp2) >= 20):
                    break
    return Response(result, status=status.HTTP_200_OK)


@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET', 'POST'])
def create_comment(request, movie):
    if request.method == "GET":
        comments = Comment.objects.filter(review=review_pk)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        review = get_object_or_404(Review, pk=review_pk)
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(author=request.user, review=review)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def get_movieti_result(request, result):
    movieti = get_object_or_404(Movieti, pk=result)
    serializers = MovietiSerializer(movieti)
    return Response(serializers.data, status=status.HTTP_200_OK)
