import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Layout from '../../Layout';
import Button from '@material-ui/core/Button';

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
  const [nowMovies,setNowMovies] = useState([])
  const [topRatedMovies,setTopRatedMovies] = useState([])
  const [upComingmovies,setUpComingMovies] = useState([])
  const [movieTi,setmovieTi]= useState([])

  const nowMoviesUrl = "http://localhost:8000/movie/nowplaying"
  const topRatedMoviesUrl = "http://localhost:8000/movie/toprated"
  const upComingmoviesUrl = "http://localhost:8000/movie/upcoming"
  useEffect(()=>{
    axios.get(nowMoviesUrl)
    .then((res)=>{
      console.log(res.data);
      setNowMovies(res.data);
    })
    .catch((err)=>{
      console.log(err)
    })

    axios.get(topRatedMoviesUrl)
    .then((res)=>{
      console.log(res.data);
      setTopRatedMovies(res.data);
    })
    .catch((err)=>{
      console.log(err)
    })

    axios.get(upComingmoviesUrl)
    .then((res)=>{
      console.log(res.data);
      setUpComingMovies(res.data);
    })
    .catch((err)=>{
      console.log(err)
    })
  },[]);

    return (
      <MainPage>
        <Layout>
        </Layout>
            <button onClick = { ()=> {history.push("/mypage")}  } > MyPage </button>
            <button onClick = { ()=> {history.push("/survey")} }> Survey </button>
            <button onClick = { ()=> {history.push("/movie/movieti")} }> MovieTi </button>
          <Slider {...main_carousel_settings}>
            <div>
              <MainCarousel src="/carousel_test_img/img1.png" alt="img1" />
            </div>
            <div>
              <MainCarousel src="/carousel_test_img/img2.png" alt="img2" />
            </div>
            <div>
              <MainCarousel src="/carousel_test_img/img3.png" alt="img3" />
            </div>
            <div>
              <MainCarousel src="/carousel_test_img/img4.png" alt="img4" />
            </div>
            <div>
              <MainCarousel src="/carousel_test_img/img5.png" alt="img5" />
            </div>
          </Slider>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <SubContent id="user_recommend_movie">
            {
              movieTi?(
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                  <Button size="large" variant="contained" color="primary">다시 검사하기</Button>
                </Grid>
              )
              :(
                <div>
                  <Slider {...sub_carousel_settings}>
                    {
                      upComingmovies.map((posterId,idx)=>(
                      <div>
                        <MoviePoster 
                        id={`posterId${idx}`} 
                        src={`https://image.tmdb.org/t/p/w200${upComingmovies[idx].poster_path}`} 
                        alt="img1"
                        />
                      </div>
                      ))
                    }
                  </Slider>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button size="large" variant="contained" color="primary">다시 검사하기</Button>
                    <Button size="large" variant="contained" color="primary">결과 다시보기</Button>
                  </Grid>
                </div>
              )

            }
              <h2>추천작!!</h2>
              <Slider {...sub_carousel_settings}>
                {
                  upComingmovies.map((posterId,idx)=>(
                  <div>
                    <MoviePoster 
                    id={`posterId${idx}`} 
                    src={`https://image.tmdb.org/t/p/w200${upComingmovies[idx].poster_path}`} 
                    alt="img1"
                    />
                  </div>
                  ))
                }
              </Slider>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Button size="large" variant="contained" color="primary" onClick = { ()=> {history.push("/survey")} } >다시추천받기</Button>
              </Grid>
            </SubContent>
            <SubContent  id="new_movie">
              <h2>신작</h2>
              <Slider {...sub_carousel_settings}>
                {
                  upComingmovies.map((posterId,idx)=>(
                  <div>
                    <MoviePoster
                    id={`posterId${idx}`} 
                    src={`https://image.tmdb.org/t/p/w200${upComingmovies[idx].poster_path}`} 
                    alt="img1"
                    />
                  </div>
                  ))
                }
              </Slider>
            </SubContent>
            <SubContent id="trending_movie">
              <h2>트렌딩</h2>  
              <Slider {...sub_carousel_settings}>
                {
                  topRatedMovies.map((posterId,idx)=>(
                  <div>
                    <MoviePoster 
                    id={`posterId${idx}`} 
                    src={`https://image.tmdb.org/t/p/w200${topRatedMovies[idx].poster_path}`} 
                    alt="img1"
                    />
                  </div>
                  ))
                }
              </Slider>
            </SubContent>
            <SubContent  id="new_movie">
              <h2>현재 상영작</h2>
              <Slider {...sub_carousel_settings}>
                {
                  nowMovies.map((posterId,idx)=>(
                  <div>
                    <MoviePoster 
                    id={`posterId${idx}`} 
                    src={`https://image.tmdb.org/t/p/w200${nowMovies[idx].poster_path}`} 
                    alt="img1"
                    />
                  </div>
                  ))
                }
              </Slider>
            </SubContent>
          </Grid>
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

const MainCarousel = styled.img`
  width:20%;
  margin:auto;
  color:black;
`;
export default Main;