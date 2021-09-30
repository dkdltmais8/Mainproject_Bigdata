# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.contrib.auth.models import PermissionsMixin, AbstractBaseUser
from django.contrib.auth.models import UserManager
from django.conf import settings

class Movie(models.Model):
    movieid = models.AutoField(primary_key=True)
    tmdb_id = models.PositiveIntegerField()
    title = models.CharField(max_length=128)
    genre = models.JSONField(blank=True, null=True)
    overview = models.TextField(blank=True, null=True)
    release_date = models.DateField(blank=True, null=True)
    backdrop_path = models.CharField(max_length=128, blank=True, null=True)
    poster_path = models.CharField(max_length=128, blank=True, null=True)
    production_countries = models.JSONField(blank=True, null=True)
    runtime = models.PositiveIntegerField(blank=True, null=True)
    vote_average = models.FloatField(blank=True, null=True)
    vote_count = models.PositiveIntegerField(blank=True, null=True)
    cast = models.JSONField(blank=True, null=True)
    keywords = models.JSONField(blank=True, null=True)

    class Meta:
        db_table = 'movie'


class User(AbstractBaseUser, PermissionsMixin):
    uid = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=128, unique=True)
    password = models.CharField(max_length=128)
    nickname = models.CharField(max_length=128)
    profileimg = models.CharField(max_length=128, blank=True, null=True)
    movieti = models.CharField(max_length=4, blank=True, null=True)
    surveyed = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email' # 유저가 로그인시에 사용할 필드
    REQUIRED_FIELDS = ['username']

    class Meta:
        db_table = 'user'
    

class Comment(models.Model):
    commentid = models.AutoField(primary_key=True)
    uid = models.ForeignKey(User, on_delete=models.CASCADE, db_column='uid')
    movieid = models.ForeignKey(
        Movie, on_delete=models.CASCADE, db_column='movieid')
    comment = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'comment'


class Rating(models.Model):
    ratingid = models.AutoField(primary_key=True)
    uid = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                            related_name='rating_movies')
    movieid = models.ForeignKey(
        Movie, on_delete=models.CASCADE, db_column='movieid', blank=True, null=True)
    rating = models.PositiveIntegerField(blank=True, null=True)

    class Meta:
        db_table = 'rating'


class Recommendationmovie(models.Model):
    recommendid = models.AutoField(primary_key=True)
    uid = models.ForeignKey(User, on_delete=models.CASCADE,
                            db_column='uid', blank=True, null=True)
    movieid = models.ForeignKey(
        Movie, on_delete=models.CASCADE, db_column='movieid', blank=True, null=True)

    class Meta:
        db_table = 'recommendationmovie'


class Scrap(models.Model):
    scrapid = models.AutoField(primary_key=True)
    uid = models.ForeignKey(User, on_delete=models.CASCADE,
                            db_column='uid', blank=True, null=True)
    movieid = models.ForeignKey(
        Movie, on_delete=models.CASCADE, db_column='movieid', blank=True, null=True)

    class Meta:
        db_table = 'scrap'


class Usermovielike(models.Model):
    likeid = models.AutoField(primary_key=True)
    uid = models.ForeignKey(User, on_delete=models.CASCADE,
                            db_column='uid', blank=True, null=True)
    movieid = models.ForeignKey(
        Movie, on_delete=models.CASCADE, db_column='movieid', blank=True, null=True)

    class Meta:
        db_table = 'usermovielike'
