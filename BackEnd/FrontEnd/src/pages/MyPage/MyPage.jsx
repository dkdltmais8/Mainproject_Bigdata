import React, { useState, useEffect } from 'react';
import {
  Typography,
  makeStyles,
  Grid,
  Card,
} from '@material-ui/core'
import Layout from '../../Layout';
import Chart_star from '../../components/Chart_star'
import Chart_genre from '../../components/Chart_genre'
import Chart_tag from '../../components/Chart_tag'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  text: {
    marginTop: 50,
  },
  image: {
    marginTop: 15,
    height: "500px",
    width: "350px",    
  },
  card: {
    marginTop: 50,
    height: '300px',
    width: '1000px',
    display: 'relative',
  },
  card2: {
    marginTop: 50,
    height: '300px',
    width: '500px',
    display: 'relative',
  },
  card3: {
    marginTop: 50,
    height: '300px',
    width: '750px',
    display: 'relative',
  },
  card4: {
    marginTop: 50,
    height: '300px',
    width: '750px',
    display: 'relative',
  },
}));
function Movietimain() {
  const classes = useStyles();

  useEffect(()=>{
    axios.get(`http://localhost:8000/accounts/favorite/user`, {
                headers: {
                  Authorization: `JWT ${localStorage.getItem('jwt')}`,
                  'Content-Type': 'application/json'
                }                
              },)
                .then(res => {
                  // console.log(res.data.cnt_rate[4])
                  localStorage.setItem('movie_count', res.data.rated_movie_cnt) // 평가한 영화 개수
                  localStorage.setItem('average_rate', res.data.average_rate) // 평균 평점
                  localStorage.setItem('most_rate', res.data.most_rate) // 가장 많은 평점 및 개수
                })
                .catch(err => {
                  console.log(err)
                })
  },[]);




  return (
    <div>
      <Layout>
        </Layout>
        <Grid item xs={12}>
            <Typography variant="h3" align="center" className={classes.text}>
            내 취향 분석</Typography>
        </Grid>

        <Grid container spacing={12} >
          <Grid container spacing={1}>
            <Grid item xs={6}
              style={{
                display: 'flex' ,
                justifyContent: 'center'          
                }} 
            >
              <Grid item xs={6}
                style={{
                  display: 'relative' ,
                  justifyContent: 'center'          
                  }} 
                 >
                  <Card className={classes.card}
                  >
                    {/*별점 분포*/}
                    <Chart_star/>            
                  </Card>
              </Grid>
                
              <Grid item xs={6}
                style={{
                  display: 'relative' ,
                  justifyContent: 'center'          
                  }} 
                 >
                <Typography variant="h5" align="center" className={classes.text}>
                     영화</Typography>
              </Grid>            
            </Grid>
          </Grid>    

          <Grid item xs={6}
            style={{
              display: 'flex' ,
              justifyContent: 'center'          
              }} 
          >
            <Card className={classes.card2}
            >
              {/* 평가수 */}
              <Typography variant="h4" align="left" className={classes.text}>
            평가수</Typography>

              <Grid container spacing={3}>
                    <Grid item xs={6}
                    style={{
                      display: 'relative' ,
                      justifyContent: 'center'          
                      }} 
                     >
                      <Typography variant="h5" align="center" className={classes.text}>
                         영화</Typography>
                    </Grid>
                    <Grid item xs={6}
                    style={{
                      display: 'flex' ,
                      justifyContent: 'center'          
                      }} 
                     >
                      <Typography variant="h5" align="center" className={classes.text}>
                        평가수</Typography>
                    </Grid>
              </Grid>
            </Card>
          </Grid>    
        </Grid>

        <Grid container spacing={12}>          
          <Grid item xs={6}
            style={{
              display: 'flex' ,
              justifyContent: 'center'          
              }} 
          >
            <Card className={classes.card3}
            >
              {/* 영화 선호국가 */}
              <Typography variant="h4" align="left" className={classes.text}>
                영화 선호국가</Typography>

              <Grid container spacing={2}>
                  <Grid item xs={4}
                  style={{
                    display: 'relative' ,
                    justifyContent: 'center'          
                    }} 
                   >
                    <Typography variant="h5" align="center" className={classes.text}>
                       1등 나라 이름</Typography>
                  </Grid>
                  <Grid item xs={4}
                  style={{
                    display: 'relative' ,
                    justifyContent: 'center'          
                    }} 
                   >
                    <Typography variant="h5" align="center" className={classes.text}>
                      2등 나라 이름</Typography>
                  </Grid>
                  <Grid item xs={4}
                  style={{
                    display: 'flex' ,
                    justifyContent: 'center'          
                    }} 
                   >
                    <Typography variant="h5" align="center" className={classes.text}>
                      3등 나라 이름</Typography>
                  </Grid>
            </Grid>
            </Card>
          </Grid>   
          <Grid item xs={6}
            style={{
              display: 'flex' ,
              justifyContent: 'center'          
              }} 
          >
            <Card className={classes.card4}
            >
              {/*영화 선호태그*/}
              <Chart_tag/>
            </Card>
            <Typography variant="h5" align="center" className={classes.text}>
            영화 선호태그</Typography>
          </Grid>    
        </Grid>

        <Grid container spacing={12}>
          <Grid item xs={12}
            style={{
              display: 'flex' ,
              justifyContent: 'center'          
              }} 
          >
            <Card className={classes.card}
            >
              {/*영화 선호 장르*/}
              <Chart_genre/>
            </Card>
            <Typography variant="h5" align="center" className={classes.text}>
            영화 선호 장르</Typography>
          </Grid>    
        </Grid>

    </div>
  )
}

export default Movietimain
