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

# Review

진척률 : 75%..?



## Request 1

 데이터 로딩 및 Pandas DataFrame 변환하기 (parse.py)

![image-20210903085306812](C:\Users\multicampus\Documents\S05P21B305\README.assets\image-20210903085306812.png)

![image-20210903085319918](C:\Users\multicampus\Documents\S05P21B305\README.assets\image-20210903085319918.png)



## Request 2

데이터 통계값 구하기 (analyze.py)

2-1. 음식 평점 순 출력하기 + 최소 리뷰 개수 필터링

![image-20210903085526502](C:\Users\multicampus\Documents\S05P21B305\README.assets\image-20210903085526502.png)

2-2. 리뷰 개수 기준 음식점 정렬

![image-20210903085536984](C:\Users\multicampus\Documents\S05P21B305\README.assets\image-20210903085536984.png)

2-3. 리뷰 개수 기준 유저 정렬

![image-20210903085547670](C:\Users\multicampus\Documents\S05P21B305\README.assets\image-20210903085547670.png)





## Request 3

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

