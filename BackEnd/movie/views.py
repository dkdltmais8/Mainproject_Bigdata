import json
from django.db import models
from django.db.models import F, Q
from django.http import response
from django.shortcuts import get_object_or_404, render
from django.urls.conf import path
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
import requests
import random
from api.models import Movie, Movieti
from accounts.models import Comment, User
from .serializers import MovieSurveyListSerializer, MovietiSerializer, MovieDetailSerializer, CommentSerializer

# Create your views here.


@api_view(['GET'])
def get_survey_movie(request):

    # 쿼리셋 형태를 리스트로 변환, 평균 평점이 7.2보다 큰 영화만 가져옴
    movie_list = list(Movie.objects.filter(
        vote_count__gte=2000).values('tmdb_id', 'title', 'poster_path'))
    # 그 중에서 랜덤 100개
    random_list = random.sample(movie_list, 100)

    serializer = MovieSurveyListSerializer(random_list, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


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
            temp2['backdrop_path'] = temp[j].get('backdrop_path')
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
        temp2['backdrop_path'] = temp[i].get('backdrop_path')
        result.append(temp2)
    # print(result)
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
        temp2['backdrop_path'] = temp[i].get('backdrop_path')
        result.append(temp2)
    # print(result)
    return Response(result, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_movie_detail(request, movieid):
    movie = get_object_or_404(Movie, tmdb_id=movieid)
    serializers = MovieDetailSerializer(movie)

    # 트레일러 주소
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

    # 비슷한 영화 목록
    response = requests.get(
        f'{url}/{movieid}/similar?api_key={api_key}&language=ko-KR&page=1')
    temp = response.json().get('results')
    result2 = []
    for i in range(len(temp)):
        if temp[i].get('overview'):
            if temp[i].get('release_date'):
                temp2 = {}
                temp2['tmdb_id'] = temp[i].get('id')
                temp2['title'] = temp[i].get('title')
                temp2['poster_path'] = temp[i].get('poster_path')
                result2.append(temp2)
                if(len(temp2) >= 20):
                    break

    trailer_path = {"trailer_path": result}
    movielist = {"movielist": result2}

    trailer_path.update(serializers.data)
    trailer_path.update(movielist)

    return Response(trailer_path, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def comment(request, movie):
    if request.method == 'GET':
        comments = Comment.objects.filter(movieid=movie)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        uid = {"uid": request.user.uid}
        movieid = {"movieid": movie}
        uid.update(movieid)
        uid.update(request.data)

        serializer = CommentSerializer(data=uid)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def get_movieti_result(request, result):
    movieti = get_object_or_404(Movieti, pk=result)
    serializers = MovietiSerializer(movieti)
    return Response(serializers.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_cast(request):
    movie = Movie.objects.get(tmdb_id=566525).cast
    print(movie)
    for i in range(len(movie)):
        print(movie[i])
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def search_movie_title(request, searchword):
    context = {}
    if searchword:
        if len(searchword) > 0:
            movie = Movie.objects.filter(title__contains=searchword)
            if len(movie) > 100:
                movies = MovieSurveyListSerializer(movie[:100], many=True)
            else:
                movies = MovieSurveyListSerializer(movie, many=True)
            context["movies"] = movies.data

    return Response(context)


@api_view(['GET'])
def search_movie_genre(request, searchword):
    context = {}
    if searchword:
        if len(searchword) > 0:
            movie = Movie.objects.filter(genre__contains=searchword)
            if len(movie) > 100:
                movies = MovieSurveyListSerializer(movie[:100], many=True)
            else:
                movies = MovieSurveyListSerializer(movie, many=True)
            context["movies"] = movies.data

    return Response(context)


# @api_view(['GET'])
# def search_movie_cast(request, searchword):
#     context = {}
#     if searchword:
#         if len(searchword) > 0:
#             movie = Movie.objects.filter(cast__contains=searchword)
#             if len(movie) > 100:
#                 movies = MovieSurveyListSerializer(movie[:100], many=True)
#             else:
#                 movies = MovieSurveyListSerializer(movie, many=True)
#             context["movies"] = movies.data

#     return Response(context)
