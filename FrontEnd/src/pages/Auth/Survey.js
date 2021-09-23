import React, { useState } from "react";
import styled from "styled-components";
import StarRatingComponent from 'react-star-rating-component';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


function Survey( {history} ){
  
  const [rating, setRating] = useState(1);
  const [isHover, setisHover] = useState(false);
  const [isRate, setisRate] = useState(false);
  const [isIn, setisIn] = useState(false);
  const onStarClick = (nextValue, prevValue, name)=>{
    setRating(nextValue);
  };

  const EnterEvent = (e) => {
    setisHover(true)
    e.target.style.filter = "brightness(10%)"
    console.log("1들어갑니다.")
  }

  const LeaveEvent = (e) => {
    console.log("1나갑니다.")
    // isIn?
    //   e.target.style.filter = "brightness(10%)"&&setisHover(true)
    isRate? 
      e.target.style.filter = "brightness(10%)"&&setisHover(true)
      :isIn? 
        e.target.style.filter = "brightness(10%)"&&setisHover(true) : e.target.style.filter = "brightness(100%)"
  }

  const hoverStarEvent = (e) => {
    document.getElementById("div1").style.filter = "brightness(10%)";
    // console.log("2들어갑니다.")
    setisIn(true)
  }
  const unhoverStarEvent = (e) => {
    // console.log("2나갑니다.")
    setisIn(false)
  }

  const clickEvent = (e) => {
    console.log("2클릭합니다")
    setisRate(true)
  }
  // const country = ["미국","중국","일본","인도","한국","독일","프랑스","대만","이탈리아","상관없어요"];

  return (
    <div>
      <h3> here survey page </h3>
      <p>선호 지역을 선택해주세요</p>
      <Grid 
        id="country"
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={6}
        >
        <Grid item xs={2} container justifyContent="center">
          <Button size="large" variant="contained" color="primary">미국</Button>
        </Grid>
        <Grid item xs={2} container justifyContent="center">
          <Button size="large" variant="contained" color="primary">중국</Button>
        </Grid>
        <Grid item xs={2} container justifyContent="center">
          <Button size="large" variant="contained" color="primary">일본</Button>
        </Grid>
        <Grid item xs={2} container justifyContent="center">
          <Button size="large" variant="contained" color="primary">인도</Button>
        </Grid>
        <Grid item xs={2} container justifyContent="center">
          <Button size="large" variant="contained" color="primary">한국</Button>
        </Grid>
        <Grid item xs={2} container justifyContent="center">
          <Button size="large" variant="contained" color="primary">독일</Button>
        </Grid>
        <Grid item xs={2} container justifyContent="center">
          <Button size="large" variant="contained" color="primary">프랑스</Button>
        </Grid>
        <Grid item xs={2} container justifyContent="center">
          <Button size="large" variant="contained" color="primary">대만</Button>
        </Grid>
        <Grid item xs={2} container justifyContent="center">
          <Button size="large" variant="contained" color="primary">이탈리아</Button>
        </Grid>
        <Grid item xs={2} container justifyContent="center">
          <Button size="large" variant="contained" color="primary">상관없어요</Button>
        </Grid>
      </Grid>
        <p>시청한 영화를 평가해주세요</p>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <div style={{position:"relative",width:"20%"}}>
          <MoviePoster 
            id="div1" 
            onMouseEnter={EnterEvent}
            onMouseLeave={LeaveEvent}
            src="/carousel_test_img/img1.png" 
            alt="img1"
          />
          <div 
            onClick={clickEvent}
            onMouseOver={hoverStarEvent}
            onMouseOut={unhoverStarEvent}
            style={{position:"absolute",top:"50%",left:"50%",transform: "translate(-50%, -50%)"}}>
            {
              isHover?
              <StarRatingComponent
              name="rate1" 
              starCount={5}
              value={rating}
              onStarClick= {onStarClick}
              />
              :null
            }
          </div>
        </div>
        <div style={{position:"relative",width:"20%"}}>
          <MoviePoster 
            id="div1" 
            onMouseEnter={EnterEvent}
            onMouseLeave={LeaveEvent}
            src="/carousel_test_img/img4.png" 
            alt="img1"
          />
          <div 
            onClick={clickEvent}
            onMouseOver={hoverStarEvent}
            onMouseOut={unhoverStarEvent}
            style={{position:"absolute",top:"50%",left:"50%",transform: "translate(-50%, -50%)"}}>
            {
              isHover?
              <StarRatingComponent
              name="rate1" 
              starCount={5}
              value={rating}
              onStarClick= {onStarClick}
              />
              :null
            }
          </div>
        </div>
        <div style={{position:"relative",width:"20%"}}>
          <MoviePoster 
            id="div1" 
            onMouseEnter={EnterEvent}
            onMouseLeave={LeaveEvent}
            src="/carousel_test_img/img2.png" 
            alt="img1"
          />
          <div 
            onClick={clickEvent}
            onMouseOver={hoverStarEvent}
            onMouseOut={unhoverStarEvent}
            style={{position:"absolute",top:"50%",left:"50%",transform: "translate(-50%, -50%)"}}>
            {
              isHover?
              <StarRatingComponent
              name="rate1" 
              starCount={5}
              value={rating}
              onStarClick= {onStarClick}
              />
              :null
            }
          </div>
        </div>
        <div style={{position:"relative",width:"20%"}}>
          <MoviePoster 
            id="div1" 
            onMouseEnter={EnterEvent}
            onMouseLeave={LeaveEvent}
            src="/carousel_test_img/img3.png" 
            alt="img1"
          />
          <div 
            onClick={clickEvent}
            onMouseOver={hoverStarEvent}
            onMouseOut={unhoverStarEvent}
            style={{position:"absolute",top:"50%",left:"50%",transform: "translate(-50%, -50%)"}}>
            {
              isHover?
              <StarRatingComponent
              name="rate1" 
              starCount={5}
              value={rating}
              onStarClick= {onStarClick}
              />
              :null
            }
          </div>
        </div>
      </Grid>
      <Grid 
        container
        direction="row"
        justifyContent="center"
        alignItems="center">
        <Button size="large" variant="contained" color="primary">제출하기</Button>
      </Grid>
    </div>
  );
}

const MoviePoster = styled.img`
  width:100%;
`;


export default Survey;

// 오버하면 회색으로 바뀌고 클릭안하고 그냥가면 원래 이미지로 바귐
// 근데 오버 하고 클릭하면 회색인채로 남아있음