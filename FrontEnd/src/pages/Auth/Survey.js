import React from "react";
import Card from '@material-ui/core/Card';


function Survey( {history} ){
    return (
        <div>
          <h3> here survey page </h3>
          <div>
            <p>선호 지역을 선택해주세요</p>
            <button>미국</button>
            <button>중국</button>
            <button>한국</button>
            <button>일본</button>
          </div>
          <div>
            <p>시청한 영화를 평가해주세요</p>
            <Card variant="outlined">a</Card>
          </div>
        </div>
    );
}

export default Survey;