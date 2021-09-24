import React from 'react';
import styled from "styled-components";
import StarRatingComponent from 'react-star-rating-component';


const onStarClick = (nextValue, prevValue, name)=>{
  setRating(nextValue);
};

function SurveyMovie(postersId,idx){
  const countryNames = ["미국","중국","일본","인도","한국","프랑스","대만","이탈리아","상관없어요"];
  const posters = [1,2,3,4,5];
  const [rating, setRating] = useState(1);
  const [isRate, setisRate] = useState(false);
  const [isHover, setisHover] = useState(false);
  const [countries,setCountries] = useState([]);
  const [scores,setScores] = useState([]);

  const onStarClick = (nextValue, prevValue, name)=>{
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

  return (
      <div style={{position:"relative",width:"20%"}}
        onMouseEnter={(e)=>EnterEvent(idx,e)}
        onMouseLeave={(e)=>LeaveEvent(idx,e)}
        key={idx}
      >
        <MoviePoster 
          id={`posterId${idx}`} 
          src={`/carousel_test_img/img${postersId}.png`} 
          alt="img1"
        />
        <span 
          id={`starId${idx}`}
          onClick={(e) => clickEvent(idx,e)}
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
        </span>
      </div>
  );
}

const MoviePoster = styled.img`
width:100%;
`;


export default SurveyMovie;