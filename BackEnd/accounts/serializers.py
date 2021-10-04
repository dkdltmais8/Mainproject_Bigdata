from django.db import models
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Rating

User = get_user_model()


class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'nickname')


class UserRatingMovie(serializers.ModelSerializer):

    class Meta:
        model = Rating


class UserMovieti(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'
