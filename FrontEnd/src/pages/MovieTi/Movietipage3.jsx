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
function Movietipage3() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        MoVieTI   
      </Typography>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        Q 03.  
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        스파이가 된 당신! 당신이 맡게 될 일은?
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
            history.push(`/movie/movieti/4`)
          }}
        >
          사람들 사이에 스며들어 정보를 캐오는 일
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
            history.push(`/movie/movieti/4`)
          }}
        >
          홀로 비밀스레 잠입해 정보를 빼돌리는 일
        </Button>
      </div>
        <Typography variant="h6" align="center" gutterBottom>
          3/13
        </Typography>
    </div>
  )
}

export default Movietipage3
