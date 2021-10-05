import React, { useState, useEffect } from 'react';
import 
{ Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } 
from 'recharts';
import axios from 'axios';

const Chart_star = () => {
  

  useEffect(()=>{
    axios.get(`http://localhost:8000/accounts/favorite/user`, {
                headers: {
                  Authorization: `JWT ${localStorage.getItem('jwt')}`,
                  'Content-Type': 'application/json'
                }                
              },)
                .then(res => {
                  console.log(res)
                  localStorage.setItem('movie_count', res.data.rated_movie_cnt) // 평가한 영화 개수
                  localStorage.setItem('average_rate', res.data.average_rate) // 평균 평점
                  localStorage.setItem('most_rate', res.data.most_rate) // 가장 많은 평점 및 개수
                  localStorage.setItem('cnt_rate', res.data.cnt_rate)  // 각 평점 별 개수 
                })
                .catch(err => {
                  console.log(err)
                })
  },[]);

  const [name] = useState(localStorage.getItem("nickname"));

  const data = [
    {
      subject: '1점',
      A: 10,
      fullMark: 30,
    },
    {
      subject: '2점',
      A: 5,
      fullMark: 30,
    },
    {
      subject: '3점',
      A: 5,
      fullMark: 30,
    },
    {
      subject: '4점',
      A: 5,
      fullMark: 30,
    },
    {
      subject: '5점',
      A: 15,
      fullMark: 30,
    },
  ];

  return(
    <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name={name} dataKey= "A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.7} />
        </RadarChart>
      </ResponsiveContainer>
  );
};

export default Chart_star;