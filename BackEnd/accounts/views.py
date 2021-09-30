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
        return Response({'success': '사용가능한 이메일입니다.'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': '동일한 이메일이 존재합니다.'}, status=status.HTTP_400_BAD_REQUEST)

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


@api_view(['DELETE'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def survey_reset(request):
    print(request.user.uid)
    user = Rating.objects.filter(uid=request.user.uid)
    print(user)
    user.delete()
    return Response(status=status.HTTP_200_OK)
# 그런데 설문을 통한 평가 말고 개인적으로 평가한것도 같은 테이블에 들어갈텐데..!?

