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
function Movietipage7() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        MoVieTI   
      </Typography>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        Q 07.  
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        친구가 오늘 너무 짜증나서 공포영화를 보겠다고 한다.
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
            history.push(`/movie/movieti/8`)
          }}
        >
          짜증나는거랑 공포영화랑 무슨상관이지? 
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
            history.push(`/movie/movieti/8`)
          }}
        >
          무슨 일인데? 왜 짜증난건데?
        </Button>
      </div>
        <Typography variant="h6" align="center" gutterBottom>
          7/13
        </Typography>
    </div>
  )
}

export default Movietipage7
