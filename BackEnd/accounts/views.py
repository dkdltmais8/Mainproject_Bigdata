import operator
from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from .serializers import UserSignupSerializer
from django.contrib.auth import get_user_model
from .models import Movie, User, Rating, Tempmovieti, Recommendationmovie
import pandas as pd
import pymysql
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from ast import literal_eval


import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import pymysql.cursors
import json

# 평가한 영화 수 -> 개수
# 별점 분포? - 별점 평균, 별점 개수, 많이 준 별점
# 영화 선호 태그
# 선호 배우, 선호 감독
# 선호 국가
# 선호 장르 -> 몇편인지
# 영화 감상 시간


@api_view(['GET'])
def analysis_favorite(request):
    # DB에 접속, 필요한 정보 명시
    conn = pymysql.connect(
        user='root',
        password='ssafy',
        database='bigdatapjt',
        host='localhost',
        port=3306,
        charset='utf8',
        autocommit=True,
        cursorclass=pymysql.cursors.DictCursor
    )
    # sql문 실행하기
    cursor = conn.cursor()
    sql = 'SELECT t1.movieid, t1.tmdb_id, t1.title, t1.genre, t1.release_date, t1.production_countries, t1.runtime, t1.vote_average, t1.vote_count, t1.cast, t1.keywords FROM bigdatapjt.movie as t1 where t1.movieid in (select t2.movieid from bigdatapjt.rating t2 where t2.uid_id=1);'
    cursor.execute(sql)
    # 데이터 받아오기
    queryset = cursor.fetchall()
    # db닫기
    cursor.close()
    conn.close()

    # 데이터 프레임으로 만들기
    df = pd.DataFrame(queryset)
    print(type(df))

    df['cast'] = df['cast'].apply(literal_eval)
    # df['cast'] = df['cast'].apply(lambda x : [y['name'] for y in x])
    print(df['cast'])

    # 2개 이상 나온 장르만 가져옴
    count_vect = CountVectorizer(min_df=2)
    m = count_vect.fit_transform(df['genre'])

    # print(m.toarray())
    # print(count_vect.vocabulary_)

    # 각 단어가 가지는 열의 위치를 열(value) 순서대로 바꾸기
    dic = sorted(count_vect.vocabulary_.items(), key=operator.itemgetter(1))
    # 다시 딕셔너리로 바꿔줌
    genre_dict = dict(dic)
    # 단어의 빈도수 행렬나온것을 열기준으로 합해서 리스트로 변환함
    cnt_list = m.toarray().sum(axis=0).tolist()
    # key만 뽑아내서 리스트로 만들어줌
    arr = list(genre_dict.keys())
    # 딕셔너리 value값을 빈도로 변경해줌
    for i in range(len(cnt_list)):
        genre_dict[arr[i]] = cnt_list[i]
    print(genre_dict)

    # genre_dict은 내가본 영화의 장르 빈도체크한 딕셔너리

    # 2번 이상 나온 키워드만 가져오기
    cnt_vect = CountVectorizer(min_df=2)
    n = cnt_vect.fit_transform(df['keywords'])
    print(n.toarray())
    print(cnt_vect.vocabulary_)
    cnt_keyword = n.toarray().sum(axis=0).tolist()
    print(cnt_keyword)

    # 배우 전처리
    # df['cast'] = df['cast'].apply(literal_eval)
    # df['cast'] = df['cast'].apply(literal_eval)
    # df['cast'] = df['cast'].apply(lambda x : [y['name'] for y in x])
    print(df)
    print(df['cast'])

    # 나라 전처리
    df['production_countries'] = df['production_countries'].apply(literal_eval)
    df['production_countries'] = df['production_countries'].apply(
        lambda x: [y['name'] for y in x])
    print(df['production_countries'])
    # 데이터 타입 변경
    df = df.astype({'production_countries': 'str'})
    df['production_countries'] = df['production_countries'].str.replace(
        " ", "_")
    print(df['production_countries'])

    country_vect = CountVectorizer()
    c = country_vect.fit_transform(df['production_countries'])
    print(country_vect.vocabulary_)
    print(c.toarray())

    return Response(status=status.HTTP_200_OK)


# 회원가입


@api_view(['POST'])
def signup(request):
    password = request.data.get('password')
    password_confirmation = request.data.get('passwordConfirmation')

    # 비밀번호 일치하지않으면 저장하지 않음
    if password != password_confirmation:
        return Response({'error': '비밀번호가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    # 닉네임은 이메일 @ 앞부분 잘라서 넣기
    temp = request.data.get('email').split('@')
    nickname_first = temp[0]

    serializer = UserSignupSerializer(data=request.data)

    # auth_user에 저장
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(request.data.get('password'))
        user.nickname = nickname_first
        user.save()
        # 유저 생성할 때, movieti 결과 도출 테이블에도 함께 생성
        Tempmovieti.objects.create(
            uid=User.objects.get(email=request.data.get('email')).uid
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print(serializer.errors)
        print(serializer.error_messages)
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

# 이메일 중복 api 만들기


@api_view(['POST'])
def checkEmail(request):
    user_email = request.data.get('user_email')
    try:
        # 중복된 경우
        u_email = User.objects.get(email=user_email)
    except:
        # 중복되지 않는 경우
        u_email = None
    if u_email is None:
        return Response({'success': '사용가능한 이메일입니다.'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': '동일한 이메일이 존재합니다.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def survey_result(request):
    if request.data.get('result'):
        # 유저 이메일이랑 결과 받아서
        user_email = request.data.get('id')
        survey_result = request.data.get('result')
        # 딕셔너리에서 key, value쌍 꺼내서 rating테이블에 생성하기
        for param_tmdb, rating in survey_result.items():
            if(Movie.objects.get(tmdb_id=param_tmdb) != None and User.objects.get(email=user_email) != None):
                movie_id = Movie.objects.get(tmdb_id=param_tmdb).movieid
                user_id = User.objects.get(email=user_email).uid
                if Rating.objects.filter(uid_id=user_id, movieid=movie_id):
                    return Response({'error': '동일한 영화를 이미 평가했습니다.'}, status=status.HTTP_409_CONFLICT)
                Rating.objects.create(
                    movieid=Movie.objects.get(tmdb_id=param_tmdb),
                    uid=User.objects.get(email=user_email),
                    rating=rating,
                    survey=True
                )
        # user테이블에 설문했는지 안했는지 업데이트
        user = User.objects.get(email=user_email)
        user.surveyed = True
        user.save()

        result = survey_result_func(user.uid)
        result_insert(user, result)
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['DELETE'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def survey_reset(request):
    # 유저가 설문조사를 통해 평가한 영화만 삭제하기
    user = Rating.objects.filter(uid=request.user.uid, survey=True)
    user.delete()
    return Response(status=status.HTTP_200_OK)


def survey_result_func(userid):

    with open("./example.json", "r", encoding="utf8") as f:
        contents = f.read()  # string 타입
        json_data_realreal = json.loads(contents)

    df4 = pd.DataFrame(json_data_realreal)

    ################################################### DB에서 rating 테이블 불러오기############################################################
    conn = pymysql.connect(
        user='root',
        password='ssafy',
        database='bigdatapjt',
        host='localhost',
        port=3306,
        charset='utf8',
        autocommit=True,
        cursorclass=pymysql.cursors.DictCursor
    )
    cursor = conn.cursor()
    sql = 'select * from bigdatapjt.rating'
    cursor.execute(sql)
    res = cursor.fetchall()
    conn.close()
    df3 = pd.DataFrame(res)
    me = userid  # 실제로는 접속해 있는 유저의 uid_id
    df3 = df3.loc[df3['uid_id'] == userid, ['movieid', 'rating']
                  ].sort_values('rating', ascending=False)
    # print(df3)
    movieid_lst = [df3['movieid']]
    # print(movieid_lst)
    good_movie = []
    bad_movie = []
    for c, i in df3.iterrows():
        if i.rating >= 3:
            good_movie.append(i.movieid)
        else:
            bad_movie.append(i.movieid)
    dataframe_table = pd.DataFrame()
    # print(good_movie,bad_movie)
    ##########################################################################################################################################
    # ##############################################가중치를 계산한 평점 ######################################################################
    C = df4['vote_average'].mean()

    m = df4['vote_count'].quantile(0.6)

    def weighted_vote_average(record):
        v = record['vote_count']
        R = record['vote_average']

        return ((v/(v+m)) * R) + ((m/(m+v)) * C)

    df4['weighted_vote'] = df4.apply(weighted_vote_average, axis=1)
    # ###########################################################################################################################################
    df4['keywords'] = df4['keywords'].apply(literal_eval)
    df4['genre'] = df4['genre'].apply(literal_eval)

    df4['genre'] = df4['genre'].apply(lambda x: [y['name'] for y in x])
    df4['keywords'] = df4['keywords'].apply(lambda x: [y['name'] for y in x])

    df4['recommend_item'] = df4['keywords'].apply(lambda x: ' '.join(x))
    df4['recommend_item'] += df4['genre'].apply(lambda x: ' '.join(x))

    # print(df4['keywords'])
    # print(type(df4['keywords']))
    # input_movie에 rating한 영화 이름집어넣기
    for i in good_movie:
        input_movie = i
        input_title = df4[df4['movieid'] == input_movie]['title']
        tfidf_vec = TfidfVectorizer(ngram_range=(1, 5))
        # print('------------------------------------------------------'*5)
        # print(f'키워드+장르 - TfidfVectorizer    {input_title}')
        # print('------------------------------------------------------'*5)
        tfidf_matrix = tfidf_vec.fit_transform(df4['recommend_item'])
        genres_similarity = cosine_similarity(tfidf_matrix, tfidf_matrix)

        # #######################################################별점이 3점 이상이면 #################################################
        # print('너무 좋아!')
        # print('------------------------------------------------------'*5)

        similar_index = np.argsort(-genres_similarity)
        movie_index = df4[df4['movieid'] == input_movie].index.values
        similar_movies = similar_index[movie_index, :20]
        similar_movies_index = similar_movies.reshape(-1)
        # print(df4.loc[similar_movies_index, ['title', 'movieid', 'weighted_vote']].sort_values(
        #     'weighted_vote', ascending=False).head(3))
        dataframe_table = pd.concat([dataframe_table, df4.loc[similar_movies_index, [
                                    'title', 'movieid', 'weighted_vote']].sort_values('weighted_vote', ascending=False).head(3)])
        # print('------------------------------------------------------'*5)
    for i in bad_movie:
        input_movie = i
        input_title = df4[df4['movieid'] == input_movie]['title']
        tfidf_vec = TfidfVectorizer(ngram_range=(1, 5))
        # print('------------------------------------------------------'*5)
        # print(f'키워드+장르 - TfidfVectorizer    {input_title}')
        # print('------------------------------------------------------'*5)
        tfidf_matrix = tfidf_vec.fit_transform(df4['recommend_item'])
        genres_similarity = cosine_similarity(tfidf_matrix, tfidf_matrix)
        # #########################################################별점이 2점 이하이면######################################################
        # print('------------------------------------------------------'*5)
        # print('너무 싫어!')
        # print('------------------------------------------------------'*5)

        similar_index = np.argsort(genres_similarity)
        movie_index = df4[df4['movieid'] == input_movie].index.values
        similar_movies = similar_index[movie_index, :20]
        similar_movies_index = similar_movies.reshape(-1)
        print(df4.loc[similar_movies_index, ['title', 'movieid', 'weighted_vote']].sort_values(
            'weighted_vote', ascending=False).head(3))
        dataframe_table = pd.concat([dataframe_table, df4.loc[similar_movies_index, [
                                    'title', 'movieid', 'weighted_vote']].sort_values('weighted_vote', ascending=False).head(3)])
        # # # Create your views here.
        # print('------------------------------------------------------'*5)
    # print('------------------------------------------------------'*5)
    dataframe_table = dataframe_table.sort_values(
        'weighted_vote', ascending=False)[:10]
    # print(dataframe_table)
    result = []
    for c, i in dataframe_table.iterrows():
        if i.movieid not in result:
            result.append(i.movieid)
    print(result)
    return result
    #########################################################설문 기반 추천 끝!#########################################################################


def result_insert(user, result):
    for i in result:
        Recommendationmovie.objects.create(
            movieid=Movie.objects.get(movieid=i),
            uid=user
        )
