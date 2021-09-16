from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import requests
from .models import Movie
# Create your views here.

# 영화 db에 넣기
@api_view(['GET'])
def get_movie_list(request):
    url = 'https://api.themoviedb.org/3/movie/popular'
    api_key = 'e65e678451c2b671218a36fb34998488'
    for x in range(1, 501) :
        response = requests.get(f'{url}?api_key={api_key}&language=ko-KR&page={str(x)}')
        # print(response.json().get('results'))
        result = response.json().get('results')
        for i in range(len(result)):
            if result[i].get('overview'):
                if result[i].get('release_date'):
                    Movie.objects.create(
                        tmdb_id = result[i].get('id'),
                        title = result[i].get('title'),
                        genre = result[i].get('genre_ids'),
                        overview = result[i].get('overview'),
                        poster_path = result[i].get('poster_path'),
                        release_date = result[i].get('release_date'),
                        vote_average = result[i].get('vote_average'),
                        vote_count = result[i].get('vote_count')
                    )
    return Response(status=status.HTTP_200_OK)
