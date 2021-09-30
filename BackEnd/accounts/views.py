from django.http.response import JsonResponse
from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from .serializers import UserSignupSerializer
from django.contrib.auth import get_user_model
from .models import Movie, User, Rating

# 회원가입
@api_view(['POST'])
def signup(request):
    password = request.data.get('password')
    password_confirmation = request.data.get('passwordConfirmation')
    print(request.data, '들어온 정보 확인')

    # 비밀번호 일치하지않으면 저장하지 않음
    if password != password_confirmation:
        return Response({'error': '비밀번호가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    # 닉네임은 이메일 @ 앞부분 잘라서 넣기

    serializer = UserSignupSerializer(data=request.data)

    # auth_user에 저장
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(request.data.get('password'))
        user.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print(serializer.errors)
        print(serializer.error_messages)
        return Response(serializer.errors)

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
        duplicated = "Allowed"
    else:
        duplicated = "Not Allowed"
    context = {'duplicated': duplicated}
    return Response(context, status=status.HTTP_200_OK)


@api_view(['POST'])
def survey_result(request):
    if request.data.get('result'):
        user_email = request.data.get('id')
        survey_result = request.data.get('result')       

        for param_tmdb, rating in survey_result.items():
            if(Movie.objects.get(tmdb_id=param_tmdb) != None and User.objects.get(email=user_email) != None) :
                Rating.objects.create(
                    movieid = Movie.objects.get(tmdb_id=param_tmdb),
                    uid = User.objects.get(email=user_email),
                    rating = rating
                )
        user = User.objects.get(email=user_email)
        user.surveyed = True
        user.save()
        return Response(status=status.HTTP_200_OK) 
    else:
        return Response(status=status.HTTP_204_NO_CONTENT)

# 
@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def survey_reset(request):
    print(request.user)
    return Response(status=status.HTTP_200_OK)



# 설문조사 했는지 안했는지 판별하기 위해서 
# 로그인 -> 메인화면으로 이동하면 백이 메인요청에 설문조사 했는지 안했는지 판단해서 보내면
# 프론트가 받아서 안했으면 survey로 넘기고 했으면 그대로 메임
# 메인페이지 화면 구성이 되기전에 분기처리 해야함! -> 유저테이블에 survey_yn

# 취향분석
# 위에내용 정리되면 로직짜고
