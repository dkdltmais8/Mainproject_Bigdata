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
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



function Main( {history} ){
  const [nowMovies,setNowMovies] = useState([])
  const [topRatedMovies,setTopRatedMovies] = useState([])
  const [upComingmovies,setUpComingMovies] = useState([])
  const [movieTi,setmovieTi]= useState([])


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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

  // const movieDetail =(tmdb_id)=>{

  // }

    return (
      <MainPage>
        <Layout>
        </Layout>
            <button onClick = { ()=> {history.push("/mypage")}  } > MyPage </button>
            <button onClick = { ()=> {history.push("/survey")} }> Survey </button>
            <button onClick = { ()=> {history.push("/movie/movieti")} }> MovieTi </button>
          <Slider {...main_carousel_settings}>
              {
                upComingmovies.map((posterId,idx)=>(
                <div>
                  <MainCarousel 
                  id={`posterId${idx}`} 
                  src={`https://image.tmdb.org/t/p/original${upComingmovies[idx].backdrop_path}`} 
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
                        // onClick ={()=>{movieDetail(upComingmovies[idx].tmdb_id)}}
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
                    src={`https://image.tmdb.org/t/p/original${nowMovies[idx].poster_path}`} 
                    alt="img1"
                    />
                  </div>
                  ))
                }
              </Slider>
            </SubContent>
          </Grid>
          <Button size="large" variant="contained" color="primary" onClick={handleOpen}>Open modal</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
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