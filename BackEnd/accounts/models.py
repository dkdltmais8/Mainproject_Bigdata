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


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Comment(models.Model):
    commentid = models.AutoField(primary_key=True)
    uid = models.ForeignKey('User', models.DO_NOTHING, db_column='uid')
    movieid = models.ForeignKey(
        'Movie', models.DO_NOTHING, db_column='movieid')
    comment = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'comment'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey(
        'DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Keyword(models.Model):
    keywordid = models.AutoField(primary_key=True)
    movieid = models.ForeignKey(
        'Movie', models.DO_NOTHING, db_column='movieid', blank=True, null=True)
    keyword = models.CharField(max_length=128, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'keyword'


class Movie(models.Model):
    movieid = models.AutoField(primary_key=True)
    tmdb_id = models.PositiveIntegerField()
    title = models.CharField(max_length=128)
    genre = models.TextField(blank=True, null=True)
    cast = models.TextField(blank=True, null=True)
    keywords = models.TextField(blank=True, null=True)
    overview = models.TextField(blank=True, null=True)
    release_date = models.DateField(blank=True, null=True)
    backdrop_path = models.CharField(max_length=128, blank=True, null=True)
    poster_path = models.CharField(max_length=128, blank=True, null=True)
    production_countries = models.TextField(blank=True, null=True)
    runtime = models.PositiveIntegerField(blank=True, null=True)
    vote_average = models.FloatField(blank=True, null=True)
    vote_count = models.PositiveIntegerField(blank=True, null=True)

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


class User(AbstractBaseUser, PermissionsMixin):
    uid = models.AutoField(primary_key=True)
    email = models.CharField(max_length=128, unique=True)
    password = models.CharField(max_length=128)
    nickname = models.CharField(max_length=128)
    profileimg = models.CharField(max_length=128, blank=True, null=True)
    like_country = models.CharField(max_length=128, blank=True, null=True)
    movieti = models.CharField(max_length=4, blank=True, null=True)
    like_genre = models.CharField(max_length=128, blank=True, null=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['username']

    class Meta:
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
