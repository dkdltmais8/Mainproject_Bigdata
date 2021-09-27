from django.db import models
from django.db.models.fields import TextField

# Create your models here.

# class Cast(models.Model):
#     castid = models.AutoField(primary_key=True)
#     movieid = models.ForeignKey('Movie', models.DO_NOTHING, db_column='movieid')
#     tmdb_cast_id = models.PositiveIntegerField()
#     name = models.CharField(max_length=128)
#     profile_path = models.CharField(max_length=128, blank=True, null=True)
#     department = models.CharField(max_length=128, blank=True, null=True)
#     order = models.PositiveIntegerField(blank=True, null=True)
#     character = models.CharField(max_length=128, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'cast'


class Comment(models.Model):
    commentid = models.AutoField(primary_key=True)
    uid = models.ForeignKey('User', models.DO_NOTHING, db_column='uid')
    movieid = models.ForeignKey(
        'Movie', models.DO_NOTHING, db_column='movieid')
    comment = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'comment'


class Keyword(models.Model):
    keywordid = models.AutoField(primary_key=True)
    movieid = models.ForeignKey(
        'Movie', models.DO_NOTHING, db_column='movieid')
    keyword = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'keyword'


class Movie(models.Model):
    movieid = models.AutoField(primary_key=True)
    tmdb_id = models.PositiveIntegerField()
    title = models.CharField(max_length=128)
    genre = models.TextField(blank=True, null=True)
    overview = models.TextField(blank=True, null=True)
    release_date = models.DateField(blank=True, null=True)
    backdrop_path = models.CharField(max_length=128, blank=True, null=True)
    poster_path = models.CharField(max_length=128, blank=True, null=True)
    production_countries = models.TextField(blank=True, null=True)
    runtime = models.PositiveIntegerField(blank=True, null=True)
    vote_average = models.FloatField(blank=True, null=True)
    vote_count = models.PositiveIntegerField(blank=True, null=True)
    cast = models.JSONField(blank=True, null=True)
    keywords = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'movie'


class Rating(models.Model):
    ratingid = models.AutoField(primary_key=True)
    uid = models.ForeignKey('User', models.DO_NOTHING,
                            db_column='uid', blank=True, null=True)
    movieid = models.ForeignKey(
        Movie, models.DO_NOTHING, db_column='movieid', blank=True, null=True)
    rating = models.PositiveIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rating'


class Recommendationmovie(models.Model):
    recommendid = models.AutoField(primary_key=True)
    uid = models.ForeignKey('User', models.DO_NOTHING,
                            db_column='uid', blank=True, null=True)
    movieid = models.ForeignKey(
        Movie, models.DO_NOTHING, db_column='movieid', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'recommendationmovie'


class Scrap(models.Model):
    scrapid = models.AutoField(primary_key=True)
    uid = models.ForeignKey('User', models.DO_NOTHING,
                            db_column='uid', blank=True, null=True)
    movieid = models.ForeignKey(
        Movie, models.DO_NOTHING, db_column='movieid', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'scrap'


class User(models.Model):
    uid = models.AutoField(primary_key=True)
    email = models.CharField(max_length=128)
    password = models.CharField(max_length=128)
    nickname = models.CharField(max_length=128)
    profileimg = models.CharField(max_length=128, blank=True, null=True)
    like_country = models.CharField(max_length=128, blank=True, null=True)
    movieti = models.CharField(max_length=4, blank=True, null=True)
    like_genre = models.CharField(max_length=128, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user'


class Usermovielike(models.Model):
    likeid = models.AutoField(primary_key=True)
    uid = models.ForeignKey(User, models.DO_NOTHING,
                            db_column='uid', blank=True, null=True)
    movieid = models.ForeignKey(
        Movie, models.DO_NOTHING, db_column='movieid', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'usermovielike'


class Movieti(models.Model):
    movieti = models.CharField(primary_key=True, max_length=4)
    character = models.CharField(max_length=128, blank=True, null=True)
    title = models.CharField(max_length=128, blank=True, null=True)
    imgurl = models.CharField(max_length=1024, blank=True, null=True)
    content1 = models.TextField(blank=True, null=True)
    content2 = models.TextField(blank=True, null=True)
    content3 = models.TextField(blank=True, null=True)
    content4 = models.TextField(blank=True, null=True)
    content5 = models.TextField(blank=True, null=True)
    movielist = models.JSONField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'movieti'
