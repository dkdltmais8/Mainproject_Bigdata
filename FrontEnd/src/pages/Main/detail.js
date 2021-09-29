import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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

const sub_carousel_settings = {
  dots: true,
  infinite: true,
  speed: 1150,
  slidesToShow: 5,
  centerMode: false,
  slidesToScroll: 5
};

function Detail(props){
  
  const id = props.tmdb_id;
  const movieUrl = `http://localhost:8000/movie/${id}`
  const [movie,setmovie] = useState([])
  useEffect(()=>{
    axios.get(movieUrl)
    .then((res)=>{
      console.log(res.data);
      setmovie(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })

  },[]);
  return (
    <Box sx={style} style={{color:"black"}}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {movie.title}
      </Typography>
      <Grid container>
        <Grid item xs={4}>
          <MoviePoster
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
            alt={movie.title}
          />
        </Grid>
        <Grid item xs={8}>
          {movie.trailer_path}
          {movie.overview}
        </Grid>
      </Grid>
      <Grid> 
        {movie.vote_average}  
      </Grid>
      <Grid> 
        {/* <Slider {...sub_carousel_settings}>
          {
            movie.movielist.map((relatedMovie,idx)=>(
            <div>
              <MoviePoster 
              id={`posterId${idx}`} 
              src={`https://image.tmdb.org/t/p/w200${relatedMovie.poster_path}`} 
              alt="img1"
              />
            </div>
            ))
          }
        </Slider> */}
      </Grid>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </Typography>
    </Box>
  );
}

const MoviePoster = styled.img`
  width:60%;
  margin:auto;
  color:black;
`;


export default Detail;