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
import copy
import random
from api.models import Movie, Movieti
from accounts.models import Comment, User, Rating
from .serializers import MovieSurveyListSerializer, MovietiSerializer, MovieDetailSerializer, CommentSerializer, MovietiListSerializer

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
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def get_movieti_movielist(request):
    movielist = Movieti.objects.get(movieti=request.user.movieti).movielist
    result = []
    for i in range(len(movielist)):
        temp2 = {}
        temp2['tmdb_id'] = movielist[i].get('id')
        temp2['title'] = Movie.objects.get(
            tmdb_id=movielist[i].get('id')).title
        temp2['poster_path'] = movielist[i].get('poster_path')
        temp2['backdrop_path'] = Movie.objects.get(
            tmdb_id=movielist[i].get('id')).backdrop_path
        result.append(temp2)
    print(len(result))
    return Response(result, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def get_movie_detail(request, movieid):
    movie_pk = Movie.objects.get(tmdb_id=movieid).movieid
    user_rate = Rating.objects.filter(uid=request.user.uid, movieid=movie_pk)
    rating_num = 0
    if user_rate:
        rating_num = user_rate.get().rating

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
    rating = {"rating": rating_num}

    trailer_path.update(serializers.data)
    trailer_path.update(movielist)
    trailer_path.update(rating)

    return Response(trailer_path, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def comment(request, movieid):

    real_movieid = Movie.objects.get(tmdb_id=movieid).movieid
    if request.method == 'GET':
        comments = Comment.objects.filter(movieid=real_movieid)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        uid = {"uid": request.user.uid}
        movieid = {"movieid": real_movieid}
        uid.update(movieid)
        uid.update(request.data)

        serializer = CommentSerializer(data=uid)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_comment(request, comment):
    comment = get_object_or_404(Comment, pk=comment)
    # if not request.user.my_reviews.filter(pk=review_pk).exists():
    #     return Response({'detail': '권한이 없습니다'}, status=status.HTTP_403_FORBIDDEN)

    tmp = copy.copy(comment)
    comment.delete()
    tmp = CommentSerializer(tmp)
    return Response({"삭제한 리뷰": tmp.data}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def calc_movieti_result(request):
    comment = get_object_or_404(Comment, pk=comment)
    # if not request.user.my_reviews.filter(pk=review_pk).exists():
    #     return Response({'detail': '권한이 없습니다'}, status=status.HTTP_403_FORBIDDEN)

    tmp = copy.copy(comment)
    comment.delete()
    tmp = CommentSerializer(tmp)
    return Response({"삭제한 리뷰": tmp.data}, status=status.HTTP_204_NO_CONTENT)


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


# 영화 상세페이지 안에서 평점주기
@api_view(['POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def set_rating(request, movieid):
    if request.data.get('result'):
        rate = request.data.get('result')
        if Rating.objects.get(tmdb_id=movieid):
            return Response(status=status.HTTP_409_CONFLICT)
        Rating.objects.create(
            movieid=Movie.objects.get(tmdb_id=movieid),
            uid=request.user,
            rating=rate
        )
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_204_NO_CONTENT)


# 디테일에서 영화 출연진 눌럿을때 = 검색 햇을 때?
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
