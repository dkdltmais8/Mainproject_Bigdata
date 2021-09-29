from django.db import models

# Create your models here.


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
        managed = False
        db_table = 'movie'


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
        db_table = 'movieti'
