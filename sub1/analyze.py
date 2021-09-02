from collections import UserString
from typing import Tuple
from parse import load_dataframes
import pandas as pd
import shutil


def sort_stores_by_score(dataframes, n=20, min_reviews=30):
    """
    Req. 1-2-1 각 음식점의 평균 평점을 계산하여 높은 평점의 음식점 순으로 `n`개의 음식점을 정렬하여 리턴합니다
    Req. 1-2-2 리뷰 개수가 `min_reviews` 미만인 음식점은 제외합니다.
    """
    stores_reviews = pd.merge(
        dataframes["stores"], dataframes["reviews"], left_on="id", right_on="store"
    )

    # 리뷰의 개수가 30개 미만인 음식점 거르기
    stores_reviews = stores_reviews[stores_reviews["review_cnt"] >= min_reviews]
    scores_group = stores_reviews.groupby(["store", "store_name"])

    # 평균평점구하기 => mean()
    scores = scores_group.mean()
    scores["rank"] = scores['score'].rank(ascending=False)
    scores["rank"] = scores["rank"].astype(int)
    final = scores["score"].sort_values(ascending=False)

    # reset_index => 인덱스 초기화
    return final.head(n=n).reset_index()


def get_most_reviewed_stores(dataframes, n=20):
    """
    Req. 1-2-3 가장 많은 리뷰를 받은 `n`개의 음식점을 정렬하여 리턴합니다
    """
    stores_reviews = dataframes["stores"]
    # 리뷰개수 기준으로 랭크선정
    stores_reviews["rank"] = stores_reviews["review_cnt"].rank(ascending=False)
    # 랭크를 int타입으로 변환
    stores_reviews["rank"] = stores_reviews["rank"].astype(int)
    # 랭크기준으로 새로운 데이터로 복사
    final = stores_reviews.sort_values(by=["rank"], ascending=True)
    return final.head(n=n).reset_index()


def get_most_active_users(dataframes, n=20):
    """
    Req. 1-2-4 가장 많은 리뷰를 작성한 `n`명의 유저를 정렬하여 리턴합니다.
    """
    stores_user_reviews = dataframes["reviews"]
    users = dataframes['users']
    
    # user개수 세기
    freq = stores_user_reviews['user'].value_counts()

    # 인덱스 초기화하고
    user_freq = freq.reset_index()
    # 합치기위해서 columns이름 바꿔줌
    user_freq.rename(columns = {'index': 'id', 'user': 'counts'}, inplace=True)

    # user랑 리뷰개수 합치고
    user_reviews = pd.merge(users, user_freq)
    # counts의 따라 재정렬
    user_reviews = user_reviews.sort_values(by=["counts"], ascending=False)
    # 중복값 삭제해줌
    user_reviews.drop_duplicates(inplace=True)

    return user_reviews.head(n=n).reset_index()


def main():
    data = load_dataframes()

    term_w = shutil.get_terminal_size()[0] - 1
    separater = "-" * term_w

    stores_most_scored = sort_stores_by_score(data)

    print("[최고 평점 음식점]")
    print(f"{separater}\n")
    for i, store in stores_most_scored.iterrows():
        print(
            "{rank}위: {store}({score}점)".format(
                rank=i + 1, store=store.store_name, score=store.score
            )
        )
    print(f"\n{separater}\n\n")

    print("[최다 리뷰 음식점]")
    print(f"{separater}\n")
    stores_most_reviews = get_most_reviewed_stores(data)
    for i, store in stores_most_reviews.iterrows():
        print(
            "{rank}위: {store}({review_cnt}개)".format(
                rank=i + 1, store=store.store_name, review_cnt=store.review_cnt
            )
        )
    print(f"\n{separater}\n\n")

    print("[최다 리뷰 유저]")
    print(f"{separater}\n")
    stores_most_reviews_user = get_most_active_users(data)
    for i, store in stores_most_reviews_user.iterrows():
        print(
            "{rank}위: {user}님({review_cnt}개)".format(
                rank=i + 1, user=store.id, review_cnt=store.counts
            )
        )
    print(f"\n{separater}\n\n")


if __name__ == "__main__":
    main()
