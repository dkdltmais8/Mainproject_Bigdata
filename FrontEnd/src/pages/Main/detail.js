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
import { Button } from "@material-ui/core";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';

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
  const [comments,setComments] = useState([])
  const [commen,setCommen] = useState('')
  const [isOpenedComments,setisOpenedComments] = useState(false)
  const [prop,setProp] = useState(props)
  const clickRelatedMovie=(relatedMovie)=>setProp(relatedMovie);
  useEffect(() => {
    const headers = {
      headers: {Authorization: `JWT ${localStorage.getItem('jwt')}`}
    }
    axios.get(`http://localhost:8000/movie/${prop.tmdb_id}`, headers)
    .then((res)=>{
      console.log(res.data);
      setmovie(res.data)
      setrelatedMovies(res.data.movielist)
      setActors(res.data.cast)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[prop]);

  const headers = {
    headers: {Authorization: `JWT ${localStorage.getItem('jwt')}`}
  }
  const OpenComments = () =>{
    if(isOpenedComments){
      setisOpenedComments(false);
    }else{
      axios.get(`http://localhost:8000/movie/${prop.tmdb_id}/comment`, headers)
      .then((res)=>{
        setisOpenedComments(true);
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }

  const SubmitComment = () =>{
    axios.post(`http://localhost:8000/movie/${prop.tmdb_id}/comment`, {
      headers: {Authorization: `JWT ${localStorage.getItem('jwt')}`},
      comment: commen
    })
    .then((res)=>{
      console.log(res.data);
      let newComments = [...comments,commen]
      setComments(newComments);
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <Box sx={style} style={{color:"black"}}>
      <Typography variant="h6" component="h2">
        {movie.title}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <MoviePoster
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
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
      <Grid>
        <Typography sx={{ mt: 2 }}>
          댓글
        </Typography>
          <TextField 
            onChange={(e)=>setCommen(e)}
            id="standard-search"
            label="댓글 작성하기"
            type="search"
            variant="standard" />
          <Button onClick={(e)=>SubmitComment(e)}>댓글 작성</Button>
            {
              isOpenedComments?
                <Button onClick={(e)=>OpenComments(e)}>댓글 접기</Button>
                :<Button onClick={(e)=>OpenComments(e)}>댓글 열기</Button>
            }     
          <Grid>
            {
              isOpenedComments?
              (
                <List>
                  {
                    comments.map((comment,idx)=>(
                      <ListItem key={comment.commentid}>
                        <p>comment</p>
                      </ListItem>
                      ))
                  }
                </List>
              )
              :null
            }
          </Grid>
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
                onClick={(e)=>clickRelatedMovie(relatedMovie,e)}
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