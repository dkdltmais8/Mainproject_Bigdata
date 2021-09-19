import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";


const main_carousel_settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  centerMode: true,
  slidesToScroll: 1
};

const sub_carousel_settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  centerMode: true,
  slidesToScroll: 5
};
function Main( {history} ){
    return (
      <MainPage>
            <h3> here Main Page? </h3>
            <button onClick = { ()=> {history.push("/mypage")}  } > MyPage </button>
            <button onClick = { ()=> {history.push("/survey")} }> Survey </button>
            <h2> movie </h2>
          <Slider {...main_carousel_settings}>
            <div>
              <MoviePoster src="/carousel_test_img/img1.png" alt="img1" />
            </div>
            <div>
              <MoviePoster src="/carousel_test_img/img2.png" alt="img2" />
            </div>
            <div>
              <MoviePoster src="/carousel_test_img/img3.png" alt="img3" />
            </div>
            <div>
              <MoviePoster src="/carousel_test_img/img4.png" alt="img4" />
            </div>
            <div>
              <MoviePoster src="/carousel_test_img/img5.png" alt="img5" />
            </div>
          </Slider>
          <h2>MovieTI</h2>
          <SubContent id="user_recommend_movie"> 
            <Slider {...sub_carousel_settings}>
              <div>
                <MoviePoster src="/carousel_test_img/img1.png" alt="img1" />
              </div>
              <div>
                <MoviePoster src="/carousel_test_img/img2.png" alt="img2" />
              </div>
              <div>
                <MoviePoster src="/carousel_test_img/img3.png" alt="img3" />
              </div>
              <div>
                <MoviePoster src="/carousel_test_img/img4.png" alt="img4" />
              </div>
              <div>
                <MoviePoster src="/carousel_test_img/img5.png" alt="img5" />
              </div>
            </Slider>
            <button>다시 검사하기</button>
            <button>결과 다시보기</button>
            <Slider {...sub_carousel_settings}>
              <div>
                <MoviePoster src="/carousel_test_img/img1.png" alt="img1" />
              </div>
              <div>
                <MoviePoster src="/carousel_test_img/img2.png" alt="img2" />
              </div>
              <div>
                <MoviePoster src="/carousel_test_img/img3.png" alt="img3" />
              </div>
              <div>
                <MoviePoster src="/carousel_test_img/img4.png" alt="img4" />
              </div>
              <div>
                <MoviePoster src="/carousel_test_img/img5.png" alt="img5" />
              </div>
            </Slider>
            <button>다시추천받기</button>
          </SubContent>
          <SubContent  id="new_movie">
            <h2>신작</h2>
            <Slider {...sub_carousel_settings}>
              <div>
                <MoviePoster src="/carousel_test_img/img1.png" alt="img1" />
              </div>
              <div>
                <MoviePoster src="/carousel_test_img/img2.png" alt="img2" />
              </div>
              <div>
                <MoviePoster src="/carousel_test_img/img3.png" alt="img3" />
              </div>
              <div>
                <MoviePoster src="/carousel_test_img/img4.png" alt="img4" />
              </div>
              <div>
                <MoviePoster src="/carousel_test_img/img5.png" alt="img5" />
              </div>
            </Slider>
          </SubContent>
          <SubContent id="trending_movie">
            <h2>트렌딩</h2>  
            <Slider {...sub_carousel_settings}>
              <div>
                <MoviePoster src="/carousel_test_img/img1.png" alt="img1" />
              </div>
              <div>
                <MoviePoster src="/carousel_test_img/img2.png" alt="img2" />
              </div>
              <div>
                <MoviePoster src="/carousel_test_img/img3.png" alt="img3" />
              </div>
              <div>
                <MoviePoster src="/carousel_test_img/img4.png" alt="img4" />
              </div>
              <div>
                <MoviePoster src="/carousel_test_img/img5.png" alt="img5" />
              </div>
            </Slider>
          </SubContent>
      </MainPage>
    );
}

const MainPage = styled.div`
  width:100%;
  justify-content:center;
  `;
const SubContent = styled.div`
  width:80%;
  margin:auto;
  background-color:white;
  border-style: solid;
  color:black;
  justify-content:center;
  aligin-content:center;
`;
const MoviePoster = styled.img`
  width:60%;
  margin:auto;
  color:black;
`;
export default Main;