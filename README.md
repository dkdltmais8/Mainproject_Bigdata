# SSAFY Bigdata project

## How to Run

### Sub1

```sh
cd sub1
pip install -r requirements.txt
python parse.py
python analyze.py
python visualize.py
```

### Sub 2

**Backend**

```sh
cd sub2/backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py initialize
python manage.py runserver
```

**Frontend**

```sh
cd sub2/frontend
npm install
npm run serve
```

### data file
  - 기본 제공 데이터: 맛집 데이터
    - 스켈레톤 폴더 내 포함
    - PW: ssafy2021!@#$ - 확인 후 본 문서에서 PW 삭제 요망
  - 추가 제공 데이터: 카드사 데이터
    - 다운로드 링크: https://lab.ssafy.com/s05-bigdata-rec/card-data/-/blob/master/card-data.zip
    - PW: ssafy2021!@#$ - 확인 후 본 문서에서 PW 삭제
  - ** SSAFY에서 제공하는 기업 데이터는 다른 목적으로 사용할 수 없으며, 데이터 원본의 외부 반출을 금합니다.**



# 💡Review

진척률 : 75%..?

어려웠던점: 늘 그랬듯이 새롭다는게 가장 큰 장벽인것 같다. 처음이다 보니 다짜고짜 시작하고 모르는걸 하나하나 검색해보면서 진행하다보니 시간이 많이걸리고 그러한 부분이 어렵다고 느껴지는것 같다. 

그치만 조금 더 해보고 익숙해진다면 어려운 부분은 아닐것 같다. 어렵지 않았으면 좋겠다. 

그리고 재밌다! 뭔가 새로운걸 배우고 익힌다는게, 그리고 내가 그것을 잘하려고 노력하는 시간이 소중하고 재밌다. 

지금은 못할 수 있지만 6주 후에는 잘하게 되리라 믿는다! 프로젝트 화이팅!



## ✔Request 1

 데이터 로딩 및 Pandas DataFrame 변환하기 (parse.py)

![image-20210903085306812](C:\Users\multicampus\Documents\S05P21B305\README.assets\image-20210903085306812.png)

![image-20210903085319918](C:\Users\multicampus\Documents\S05P21B305\README.assets\image-20210903085319918.png)



## ✔Request 2

데이터 통계값 구하기 (analyze.py)

2-1. 음식 평점 순 출력하기 + 최소 리뷰 개수 필터링

![image-20210903085526502](C:\Users\multicampus\Documents\S05P21B305\README.assets\image-20210903085526502.png)

2-2. 리뷰 개수 기준 음식점 정렬

![image-20210903085536984](C:\Users\multicampus\Documents\S05P21B305\README.assets\image-20210903085536984.png)

2-3. 리뷰 개수 기준 유저 정렬

![image-20210903085547670](C:\Users\multicampus\Documents\S05P21B305\README.assets\image-20210903085547670.png)





## ✔Request 3

데이터 시각화 (visualize.py)



3-1. 음식점 리뷰 수 분포 구하기

![image-20210903090110124](C:\Users\multicampus\Documents\S05P21B305\README.assets\image-20210903090110124.png)

-> 전체 음식점을 하려니 너무 오래걸림,,, 그래서 리뷰가 20개 미만인 음식점은 걸렀음. 그래도 빽빽하다,,, 30개로 하려다보니 너무 또 널널해보임,,, 흠?



3-2. 평균 평점 분포 구하기

![image-20210903090157640](C:\Users\multicampus\Documents\S05P21B305\README.assets\image-20210903090157640.png)

-> 이것도 모두 다 구하려니 너무 오래걸려서 리뷰가 30개 미만인 음식점은 걸렀다. 그리고 y축이 허전해보여서 눈금표시를 0.2씩 나눠줬다. 



3-3. 유저 리뷰 수 분포 구하기

![image-20210903090334731](C:\Users\multicampus\Documents\S05P21B305\README.assets\image-20210903090334731.png)

-> 분명 같은 방법으로했는데 왜 들쭉날쭉일까,,? 데이터를 출력해보면 순서대로 잘 나오는데 그래프가 마음대로다,,, 이유를 모르겠음 ㅠㅠ



3-4. 유저 나이대, 성별 분포 구하기

-> 인구통계처럼 남녀 반반 해서 년도별로 나타내고 싶은데,,,

![image-20210903104536129](C:\Users\multicampus\Documents\S05P21B305\README.assets\image-20210903104536129.png)

형식님의 도움으로 남녀 비율과 나이대로 분포도를 그렸다. 

나중엔 인구통계처럼 반반(항아리모양)으로 나누고 싶음



3-5. 음식점 위치 분포 구하기

![image-20210903103824140](C:\Users\multicampus\Documents\S05P21B305\README.assets\image-20210903103824140.png)

-> folium을 이용하여 지도 출력. 

너무 많이하면 지도에 안나올까봐 상위 30개만 잘라서 출력해보았다. 더 많이 해도 될듯!

vscode자체에서 띄우는것을 어떻게 하는지 몰라서 .html로 저장함!

