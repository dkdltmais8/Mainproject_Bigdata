from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserSignupSerializer
from django.contrib.auth import get_user_model
from .models import User

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
@api_view(['GET'])
def checkEmail(request):
    # 이메일 담아보내면 이메일 받아서 변수로 저장해놓고
    # get으로 이메일 찾아봄
    # return되는 값이 없으면 중복된게 아니니까 ok리턴

    return

