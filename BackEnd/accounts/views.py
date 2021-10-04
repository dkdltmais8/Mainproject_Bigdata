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
from .models import Movie, User, Rating
import pandas as pd 
import pymysql
from sklearn.feature_extraction.text import CountVectorizer
from ast import literal_eval


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
    conn  = pymysql.connect(
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
    count_vect= CountVectorizer(min_df=2)
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
    for i in range(len(cnt_list)) :
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
    df['production_countries'] = df['production_countries'].apply(lambda x : [y['name'] for y in x])
    print(df['production_countries'])
    # 데이터 타입 변경
    df = df.astype({'production_countries': 'str'})
    df['production_countries'] = df['production_countries'].str.replace(" ", "_")
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
                    movieid = Movie.objects.get(tmdb_id=param_tmdb),
                    uid = User.objects.get(email=user_email),
                    rating = rating,
                    survey = True
                )
        # user테이블에 설문했는지 안했는지 업데이트
        user = User.objects.get(email=user_email)
        user.surveyed = True
        user.save()
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

