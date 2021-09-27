# Generated by Django 3.2.7 on 2021-09-26 16:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_delete_cast'),
    ]

    operations = [
        migrations.CreateModel(
            name='Movieti',
            fields=[
                ('movieti', models.CharField(max_length=4, primary_key=True, serialize=False)),
                ('character', models.CharField(blank=True, max_length=128, null=True)),
                ('title', models.CharField(blank=True, max_length=128, null=True)),
                ('imgurl', models.CharField(blank=True, max_length=1024, null=True)),
                ('content1', models.TextField(blank=True, null=True)),
                ('content2', models.TextField(blank=True, null=True)),
                ('content3', models.TextField(blank=True, null=True)),
                ('movielist', models.JSONField(blank=True, null=True)),
            ],
            options={
                'db_table': 'movieti',
                'managed': False,
            },
        ),
    ]