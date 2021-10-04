import React from 'react'
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


  return (
    <div>
      <Layout>
        </Layout>
        <Grid item xs={12}>
            <Typography variant="h3" align="center" className={classes.text}>
            내 취향 분석</Typography>
        </Grid>

        <Grid container spacing={12} >
          <Grid item xs={8}
            style={{
              display: 'flex' ,
              justifyContent: 'center'          
              }} 
          >
            <Card className={classes.card}
            >
              {/*별점 분포*/}
              <Chart_star/>            
            </Card>
            <Typography variant="h5" align="center" className={classes.text}>
            별점 분포</Typography>
          </Grid>    
          <Grid item xs={4}
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
                  <Grid item xs={4}
                  style={{
                    display: 'relative' ,
                    justifyContent: 'center'          
                    }} 
                   >
                    <Typography variant="h5" align="center" className={classes.text}>
                       영화</Typography>
                  </Grid>
                  <Grid item xs={4}
                  style={{
                    display: 'relative' ,
                    justifyContent: 'center'          
                    }} 
                   >
                    <Typography variant="h5" align="center" className={classes.text}>
                      TV 프로그램</Typography>
                  </Grid>
                  <Grid item xs={4}
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
