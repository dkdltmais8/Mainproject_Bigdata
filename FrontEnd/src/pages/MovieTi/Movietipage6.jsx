import React from 'react'
import {useHistory} from 'react-router-dom';
import {
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  submit: {
    width: '30%',
    margin: theme.spacing(3, 0, 2),
  },
}));
function Movietipage6() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        MoVieTI   
      </Typography>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        Q 06.  
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        오랜만의 휴식시간. 더 끌리는 쪽은?
      </Typography>
      <div 
      style={{
        display: 'flex' ,
        justifyContent: 'center'
        }}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"          
          className={classes.submit}
          onClick = {() => {
            history.push(`/movie/movieti/7`)
          }}
        >
          집에서 편하게 즐기는 넷플릭스
        </Button>
      </div>
      <div 
        style={{
          display: 'flex' ,
          justifyContent: 'center'
          }}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick = {() => {
            history.push(`/movie/movieti/7`)
          }}
        >
          영화는 큰 스크린으로 봐야지! 용아맥 가자!
        </Button>
      </div>
        <Typography variant="h6" align="center" gutterBottom>
          6/13
        </Typography>
    </div>
  )
}

export default Movietipage6
