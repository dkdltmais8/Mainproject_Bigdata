from django.urls import path
from . import views
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token


urlpatterns = [
    path('signup/', views.signup),
    # 토큰 파트 추가
    path('api/token/auth/', obtain_jwt_token),
    path('api/token/verify/',  verify_jwt_token),
]
