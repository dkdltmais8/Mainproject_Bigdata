import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Layout from '../../Layout';
import Button from '@material-ui/core/Button';
import Modal from '@mui/material/Modal';
import Detail from './detail'

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
  speed: 1150,
  slidesToShow: 5,
  centerMode: false,
  slidesToScroll: 5
};


function Main( {history} ){
  const [nowMovies,setNowMovies] = useState([])
  const [topRatedMovies,setTopRatedMovies] = useState([])
  const [upComingmovies,setUpComingMovies] = useState([])
  const [movieTi,setmovieTi]= useState([])


  const [open, setOpen] = useState('');
  const handleOpen = (tmdb_id) => setOpen(tmdb_id);
  const handleClose = () => setOpen('');


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
              {
                upComingmovies.map((upComingmovie,idx)=>(
                <div key={upComingmovie.tmdb_id}>
                  <MainCarousel 
                  id={`posterId${idx}`} 
                  src={`https://image.tmdb.org/t/p/original${upComingmovie.backdrop_path}`} 
                  alt="img1"
                    />
                    {/* box-shadow: 12px 100px 100px 100px #001122; 이미지 테두리 생성*/ }
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
            <SubContent id="user_recommend_movie">
            {
              movieTi?(
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                  <Button size="large" variant="contained" color="primary">MovieTi 검사하기</Button>
                </Grid>
              )
              :(
                <div>
                  <Slider {...sub_carousel_settings}>
                    {
                      upComingmovies.map((upComingmovie,idx)=>(
                      <div key={upComingmovie.tmdb_id}>
                        <MoviePoster 
                        onClick = {(e)=>handleOpen(upComingmovie.tmdb_id,e)}
                        id={`posterId${idx}`} 
                        src={`https://image.tmdb.org/t/p/w200${upComingmovie.poster_path}`} 
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
              <h2>추천 영화</h2>
              <Slider {...sub_carousel_settings}>
                {
                  upComingmovies.map((upComingmovie,idx)=>(
                  <div key={upComingmovie.tmdb_id}>
                    <MoviePoster 
                    onClick = {(e)=>handleOpen(upComingmovie.tmdb_id,e)}
                    id={`posterId${idx}`} 
                    src={`https://image.tmdb.org/t/p/w200${upComingmovie.poster_path}`} 
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
              <h2>Upcoming Movie</h2>
              <Slider {...sub_carousel_settings}>
                {
                  upComingmovies.map((upComingmovie,idx)=>(
                  <div key={upComingmovie.tmdb_id}>
                    <MoviePoster
                    onClick = {(e)=>handleOpen(upComingmovie.tmdb_id,e)}
                    id={`posterId${idx}`} 
                    src={`https://image.tmdb.org/t/p/w200${upComingmovie.poster_path}`} 
                    alt="img1"
                    />
                  </div>
                  ))
                }
              </Slider>
            </SubContent>
            <SubContent id="trending_movie">
              <h2>Top Rated Movie</h2>  
              <Slider {...sub_carousel_settings}>
                {
                  topRatedMovies.map((topRatedMovie,idx)=>(
                  <div key={topRatedMovie.tmdb_id}>
                    <MoviePoster 
                      onClick = {(e)=>handleOpen(topRatedMovie.tmdb_id,e)}
                      id={`posterId${idx}`} 
                      src={`https://image.tmdb.org/t/p/w200${topRatedMovie.poster_path}`} 
                      alt="img1"
                    />
                  </div>
                  ))
                }
              </Slider>
            </SubContent>
            <SubContent  id="new_movie">
              <h2>Now Playing Movie</h2>
              <Slider {...sub_carousel_settings}>
                {
                  nowMovies.map((nowMovie,idx)=>(
                  <div key={nowMovie.tmdb_id}>
                    <MoviePoster 
                      onClick = {(e)=>handleOpen(nowMovie.tmdb_id,e)}
                      id={`posterId${idx}`} 
                      src={`https://image.tmdb.org/t/p/original${nowMovie.poster_path}`} 
                      alt="img1"
                    />
                  </div>
                  ))
                }
              </Slider>
            </SubContent>
          </Grid>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Detail tmdb_id={open}/>
          </Modal>

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
  width:50%;
  margin:auto;
  color:black;
`;
export default Main;