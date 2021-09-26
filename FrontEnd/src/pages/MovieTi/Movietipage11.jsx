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
function Movietipage11() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        MoVieTI   
      </Typography>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        Q 11.  
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        우리 내일 영화보고 뭐할래? 나는...
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
            history.push(`/movie/movieti/12`)
          }}
        >
          음 내일 영화보고 카페가고 밥먹을래?
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
            history.push(`/movie/movieti/12`)
          }}
        >
          영화 끝나면 2시쯤이니 카페에서 3시간 수다떨고 1시간 쇼핑하고 6시에 음식점 예약해 놓을게! 
        </Button>
      </div>
        <Typography variant="h6" align="center" gutterBottom>
          11/13
        </Typography>
    </div>
  )
}

export default Movietipage11
