import React, { useState } from "react";
import styled from "styled-components";
import StarRatingComponent from 'react-star-rating-component';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import "./Survey.css";
import axios from 'axios';



function Survey( {history} ){
  const countryNames = ["미국","중국","일본","인도","한국","프랑스","대만","이탈리아","상관없어요"];
  const [countries,setCountries] = useState(["상관없어요"]);
  
  const posters = [1,2,3,4,5];
  const [rating, setRating] = useState(0);
  const [isRate, setisRate] = useState(false);
  const [scores,setScores] = useState([]);

  const url = "http://localhost:8000/movie/survey"
  axios.get(url)
    .then((res)=>{
      console.log(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })



  const onStarClick = (params, nextValue, prevValue, name)=>{
    setRating(nextValue);
  };

  const EnterEvent = (params,e) => {
    setScores([...scores,params]);
    document.getElementById("posterId"+params).style.filter = "brightness(10%)";
    console.log("1들어갑니다.");
    console.log(scores)
  }

  const LeaveEvent = (params,e) => {
    console.log("1나갑니다.");
    const poster = document.getElementById("posterId"+params);
    isRate?poster.style.filter = "brightness(10%)":poster.style.filter = "brightness(100%)";
    console.log(isRate);
    let filtered = scores.filter((element)=> element !==params);
    setScores(filtered);
  }


  const clickEvent = (params,e) => {
    console.log("2클릭합니다");
    setisRate(true);
  }

  const onClilckCountry = (selectedCountry) =>{
    if (selectedCountry==="상관없어요"){
      setCountries([selectedCountry]);
    }
    else if (countries.includes(selectedCountry)){
      setCountries(countries => countries.filter(country => country !== selectedCountry));
      return;
    }
    else{
      if(countries.includes("상관없어요")){
        setCountries([selectedCountry]);
      }
      else{
        setCountries([...countries, selectedCountry]);
      }
    }
  };
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
          color="primary"
          >
          {countryNames.map((countryName,idx)=>(
            <Button
              className ={
                countries.find(country => country === countryName)
                ? "country-item active"
                : "country-item"
              }
              onClick={()=> onClilckCountry(countryName)}
              key={idx}
            >
              {countryName}
            </Button>
          ))}
        </Grid>
      <p>시청한 영화를 평가해주세요</p>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {posters.map((postersId,idx) =>(
          <div style={{position:"relative",width:"20%"}}
            onMouseEnter={(e)=>EnterEvent(idx,e)}
            onMouseLeave={(e)=>LeaveEvent(idx,e)}
            key={idx}
          >
            <MoviePoster 
              id={`posterId${idx}`} 
              src={`/carousel_test_img/img${postersId}.png`} 
              alt="img1"
            /><span 
              onClick={(e) => clickEvent(idx,e)}
              style={{position:"absolute",top:"50%",left:"50%",transform: "translate(-50%, -50%)"}}>
              {
                postersId in scores?
                  <StarRatingComponent
                    id={`starId${idx}`}
                    starCount={5}
                    value={rating}
                    onStarClick= {(e)=>onStarClick(postersId,e)}
                  />
                  :null
              }
            </span>
          </div>
        )) }
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