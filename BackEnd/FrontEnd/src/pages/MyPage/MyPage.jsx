import React,{ useEffect,useState } from 'react'
import axios from 'axios';
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
    marginTop: 30,
  },
  text2: {
    marginTop: 100,
  },
  image: {
    marginTop: 15,
    height: "500px",
    width: "350px",    
  },
  card: {
    marginTop: 50,
    height: '400px',
    width: '1200px',
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
    height: '400px',
    width: '750px',
    display: 'relative',
  },
}));
function Movietimain() {
  const classes = useStyles();
  const [genredict,setGenredict] = useState([])
  const [keywordsdict,setKeyworddict] = useState([])
  const [country, setCountry] =useState([])
  const [moviecount, setMoviecount] = useState(0)
  const [avgrate, setAvgrate] = useState(0.0)
  const [mostrate, setMostrate] = useState([])

  const ordered_country = {};
  Object.keys(country).reverse().forEach(function(key) {
    ordered_country[key] = country[key];
  }); 

  const name = Object.keys(ordered_country)
  const number = Object.values(ordered_country)

  const rate = Object.keys(mostrate)
  const rate_number = Object.values(mostrate)

  useEffect(()=>{
    const headers = {
      headers: {Authorization: `JWT ${localStorage.getItem('jwt')}`}
    }
    
    axios.get("/accounts/favorite/movie",headers)
    .then((res)=>{
      // console.log(res.data.country_dict[1]);
      setGenredict(res.data.genre_dict)
      setKeyworddict(res.data.keywords_dict)
      setCountry(res.data.country_dict)
    })
    .catch((err)=>{
      console.log(err)
      console.log("이게안됨?")
    })

    axios.get("/accounts/favorite/user",headers)
    .then((res)=>{
      // console.log(res.data);
      setMoviecount(res.data.rated_movie_cnt)
      setAvgrate(res.data.average_rate)
      setMostrate(res.data.most_rate)
    })
    .catch((err)=>{
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

        <Grid container spacing={5}>
          <Grid item xs={12}
            style={{
              display: 'flex' ,
              justifyContent: 'center'          
              }} 
          >
            <Card className={classes.card}
            >
              {/*영화 선호 장르*/}
              <Chart_genre data={genredict}/>
            </Card>      
          </Grid>    

          <Grid item xs={12}>
            <Typography variant="h3" align="center" className={classes.text}>
            내 선호 영화 장르 </Typography>
        </Grid>
          
        </Grid>

        <Grid item xs={12} >
          <Grid container spacing={5}>
            <Grid item xs={1}></Grid>
            <Grid item xs={5}
              style={{
                display: 'flex' ,                
                justifyContent: 'center'          
                }} 
            >
              <Card className={classes.card3}
              style={{
                backgroundColor:'#151515',
                color:'violet'
              }}
              >
                {/* 영화 선호국가 */}
                <Typography variant="h4" align="center" className={classes.text}>
                  영화 선호국가</Typography>

                <Grid container spacing={2}>
                    <Grid item xs={4}
                    style={{
                      display: 'relative' ,
                      justifyContent: 'center',
                      flexDirection: 'column'          
                      }} 
                    >
                      <Typography variant="h5" align="center" className={classes.text}>
                        {name[0]}</Typography>
                        <Typography variant="h5" align="center" className={classes.text}>
                        {number[0]}</Typography>
                    </Grid>
                    <Grid item xs={4}
                    style={{
                      display: 'relative' ,
                      justifyContent: 'center',
                      flexDirection: 'column'         
                      }} 
                    >
                      <Typography variant="h5" align="center" className={classes.text}>
                        {name[1]}</Typography>
                        <Typography variant="h5" align="center" className={classes.text}>
                        {number[1]}</Typography>
                    </Grid>
                    <Grid item xs={4}
                    style={{
                      display: 'flex' ,
                      justifyContent: 'center',
                      flexDirection: 'column'         
                      }} 
                    >
                      <Typography variant="h5" align="center" className={classes.text}>
                        {name[2]}</Typography>
                        <Typography variant="h5" align="center" className={classes.text}>
                        {number[2]}</Typography>
                    </Grid>
                </Grid>
              </Card>
            </Grid>          

            <Grid item xs={5}
              style={{
                display: 'flex' ,
                justifyContent: 'center'          
                }} 
            >
              <Card className={classes.card3}
              style={{
                backgroundColor:'#151515',
                color:'violet'
              }}
              >
                {/* 평가수 */}
                <Grid container spacing={3}>
                  <Grid item xs={4}
                  style={{
                    display: 'relative' ,
                    justifyContent: 'center',
                    flexDirection: 'column',
                    }} 
                  >
                    <Typography variant="h5" align="center" className={classes.text2}>
                      평가된 영화 수</Typography>
                    <Typography variant="h5" align="center" className={classes.text}>
                    {moviecount}</Typography>
                    
                  </Grid>
                  <Grid item xs={4}
                  style={{
                    display: 'relative' ,
                    justifyContent: 'center',
                    flexDirection: 'column'          
                    }} 
                  >
                    <Typography variant="h5" align="center" className={classes.text2}>
                      영화 평균 평점</Typography>
                    <Typography variant="h5" align="center" className={classes.text}>
                    {avgrate}</Typography>                      
                  </Grid>
                  <Grid item xs={4}
                  style={{
                    display: 'relative' ,
                    justifyContent: 'center',
                    flexDirection: 'column'        
                    }} 
                  >
                    <Typography variant="h5" align="center" className={classes.text2}>
                      가장 많이 준 평점</Typography>
                    <Typography variant="h6" align="center" className={classes.text}>
                      평점: {rate} 개수: {rate_number} </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>  
                                              <Grid item xs={1}></Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}> 
        <Grid container spacing={5}>  
                                        <Grid item xs={1}></Grid>     
          <Grid item xs={5}
            style={{
              display: 'relative' ,
              justifyContent: 'center'          
              }} 
          >                
            <Card className={classes.card4}
            style={{
              backgroundColor:'#151515',
              color:'violet'
            }}
            >
              {/*평점 분포*/}
              <Chart_star/>            
            </Card>
            <Typography variant="h4" align="center" className={classes.text}>
              평점 분포</Typography>
          </Grid>

          <Grid item xs={5}
            style={{
              display: 'relative' ,              
              justifyContent: 'center'          
              }} 
          >
            <Card className={classes.card4}
              style={{
                display: 'flex' ,                
                justifyContent: 'center'          
                }} 
            >
              {/*영화 선호태그*/}
              <Chart_tag data={keywordsdict}/>            
            </Card>            
            <Typography variant="h4" align="center" className={classes.text}>
              선호 키워드</Typography>
          </Grid>  

                                          <Grid item xs={1}></Grid>  
        </Grid>
      </Grid>
    </div>
  )
}

export default Movietimain
