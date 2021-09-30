import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import ReactPlayer from 'react-player';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  height: '100vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  overflow:"scroll",
  overflowX:"hidden",
  p: 4,
};

const related_movie_carousel_settings = {
  dots: true,
  infinite: true,
  speed: 1150,
  slidesToShow: 5,
  centerMode: false,
  slidesToScroll: 5
};

const actor_carousel_settings = {
  dots: true,
  infinite: true,
  speed: 1150,
  slidesToShow: 5,
  centerMode: false,
  slidesToScroll: 5
};

function Detail(props){

  const [value, setValue] = React.useState(0);

  const [movie,setmovie] = useState([])
  const [relatedMovies,setrelatedMovies] = useState([])
  const [actors,setActors] = useState([])
  const [prop,setProp] = useState(props)
  useEffect(()=>{
    axios.get(`http://localhost:8000/movie/${prop.tmdb_id}`)
    .then((res)=>{
      console.log(res.data);
      setmovie(res.data)
      setrelatedMovies(res.data.movielist)
      setActors(res.data.cast)
    })
    .catch((err)=>{
      console.log(err)
    })

  },[]);

  const clickRelatedMovie=(id)=>setProp(id);


  return (
    <Box sx={style} style={{color:"black"}}>
      <Typography variant="h6" component="h2">
        {movie.title}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <MoviePoster
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
            alt={movie.title}
          />
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Box
              sx={{
                '& > legend': { mt: 2 },
              }}
            >
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <ReactPlayer url={movie.trailer_path} playing controls width="100%" height="65%"/>
          <br/>
          <Typography sx={{ mt: 2 }}>
            {movie.overview}
          </Typography>
        </Grid>
      </Grid>
      <Grid>
        {movie.vote_average}
      </Grid>
      <Typography sx={{ mt: 2 }}>
        관련 영화
      </Typography>
      <Grid> 
        <Slider {...related_movie_carousel_settings}>
          {
            relatedMovies.map((relatedMovie,idx)=>(
            <div key={relatedMovie.tmdb_id}>
              <MoviePoster
                onClick={(e)=>clickRelatedMovie(relatedMovie.tmdb_id,e)}
                src={`https://image.tmdb.org/t/p/w200${relatedMovie.poster_path}`} 
                alt="img1"
              />
            </div>
            ))
          }
        </Slider>
      </Grid>
      <Typography sx={{ mt: 2 }}>
        출연진
      </Typography>
      <Grid> 
        <Slider {...actor_carousel_settings}>
          {
            actors.map((actor,idx)=>(
            <div key={actor.id}>
              <ActorPoster
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} 
              alt="img1"
              />
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                spacing={1}
              >
                <Typography variant="button" display="block" gutterBottom sx={{ mt: 2 }}>
                  {actor.name}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom sx={{ mt: 2 }}>
                  {actor.character}
                </Typography>
              </Grid>
            </div>
            ))
          }
        </Slider>
      </Grid>
    </Box>
  );
}

const MoviePoster = styled.img`
  width:100%;
  margin:auto;
  color:black;
`;

const ActorPoster = styled.img`
  width:50%;
  margin:auto;
  color:black;
`;

export default Detail;