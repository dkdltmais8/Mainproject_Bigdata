import React from 'react'
import {useHistory} from 'react-router-dom';
import {
  Typography,
  makeStyles,
  Grid,
  Card,
  CardMedia,
  AppBar,
  Button
} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  submit: {
    width: '10%',
    margin: theme.spacing(3, 0, 2),

  },
  content: {
    marginTop: 50,
  },
  text: {
    marginTop: 10,
  },
  text2: {
    marginTop: 50,
  },
  image: {
    marginTop: 15,
    height: "500px",
    width: "350px",    
  },
  card: {
    marginTop: 75,
    height: '240px',
    width: '240px',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '100%'
  },
}));
function Movietimain() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <div>
      <AppBar position="relative" style={{ background: 'transparent', boxShadow: 'none', marginTop:20}}>
        <Grid container justify="space-around" alignItems="center">
          <Grid item style={{marginRight:200}}>
                <Button
                  // size="small"
                  onClick={()=>{
                    history.push('/main');
                  }}
                  variant="contained" color="primary"
                  >
                  메인페이지로 가기
                </Button>
          </Grid>
                
          <Typography variant="h3" align="center" color="text.secondary" paragraph style={{marginRight:200}}>
            MovieTI      
          </Typography>
          
          <Grid item>
                <Button
                  // size="small"
                  onClick={()=>{
                    history.push('/movie/movieti');
                  }}
                  variant="contained" color="primary"
                  >
                  다시 검사하기
                </Button>
          </Grid>
        </Grid>
      </AppBar>
    </div>

      <div>
        <Grid container spacing={12} className={classes.content}>
              <Grid item xs={8}>
                <Grid item xs={12} >
                  <Typography variant="h2" align="center">
                    '겨울왕국' 엘사
                  </Typography>
                  <Typography variant="h4" align="center" className={classes.text}>
                  어떤 일이든 꾸준히 해내는 우등생
                  </Typography>
                </Grid>
                <Grid container spacing={12}>
                  <Grid item xs={5}
                    style={{
                      display: 'flex' ,
                      justifyContent: 'center'          
                      }} 
                  >
                    <img src="https://www.womennews.co.kr/news/photo/201912/194730_312275_5657.jpg" className={classes.image}/>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6" align="left" className={classes.text2}>
                    - 내 할일 있으면 책임감 있게 일하고 충실하게 일하는 일개미 느낌. 원리원칙, 계획적이고 묵묵하게 내 일만 하는 틀에 박힌 생활을 함 </Typography>
                    <Typography variant="h6" align="left" className={classes.text2}>
                    - 혼자 있는 시간이 꼭 필요해서 익숙한 장소에 찾아가 편안하게 휴식을 취해야 스트레스를 받지 않아요. 새로운 장소나 즉흥적인거 그런거랑 거리가 멈 </Typography>
                    <Typography variant="h6" align="left" className={classes.text2}>
                    - 사람 많은 곳, 새로운 사람, 협동해야 하는 일, 새로운 경험에 대해 거부감을 느끼고 아이디어나 상상력을 요구하는 일도 맞지 않음. 그냥 규칙적이고 정적인 거 좋아함 </Typography>                                      
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                  <Grid item xs={9}>
                    <Typography variant="h3" align="center">
                      비슷한 영화
                    </Typography>
                  </Grid>
                <Grid container spacing={12}>                  
                    <Grid xs={5}>
                      <Card className={classes.card}
                        onClick={()=>{
                          history.push(`/main`) //임시로
                        }}
                      >
                        <CardMedia
                          className={classes.cardMedia}
                          image={"https://i0.wp.com/kiramonthly.com/wp-content/uploads/2020/02/1.jpg?resize=1000%2C1429"}
                        />
                      </Card>
                    </Grid>
                    <Grid xs={5}>
                      <Card className={classes.card}
                        onClick={()=>{
                          history.push(`/main`) //임시로
                        }}
                      >
                        <CardMedia
                          className={classes.cardMedia}
                          image={"https://blog.kakaocdn.net/dn/dZdJf9/btqBZg7GdO2/PKeLTQ9o7AztVm3jxpZ8bK/img.jpg"}
                        />
                      </Card>
                    </Grid>              
                </Grid>    
                <Grid container spacing={12}>                  
                    <Grid xs={5}>
                      <Card className={classes.card}
                        onClick={()=>{
                          history.push(`/main`) //임시로
                        }}
                      >
                        <CardMedia
                          className={classes.cardMedia}
                          image={"https://ww.namu.la/s/74a91154efc5e005ef7a2e32afdccc6f19d92dd1f951785128468c1c4b8d5d5a4a50ff304cec759998c9e7826c8f3cd23bd58084e8d0873e913ffdf72a005f6ee67b1e3930dbb45f0379c2a8084f774f52eaeac50947df4e9c5ee427ed939b75"}
                        />
                      </Card>
                    </Grid>
                    <Grid xs={5}>
                      <Card className={classes.card}
                        onClick={()=>{
                          history.push(`/main`) //임시로
                        }}
                      >
                        <CardMedia
                          className={classes.cardMedia}
                          image={"https://img.hankyung.com/photo/201903/BF.19074392.1.jpg"}
                        />
                      </Card>
                    </Grid>              
                </Grid>                   
              </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Movietimain
