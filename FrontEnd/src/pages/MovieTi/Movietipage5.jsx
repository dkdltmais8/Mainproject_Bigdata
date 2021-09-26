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
function Movietipage5() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        MoVieTI   
      </Typography>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        Q 05.  
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        지금 보고싶은 영화가 개봉했다. 당신의 선택은? 
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
            history.push(`/movie/movieti/6`)
          }}
        >
          일단 보자! 돈 들어오고나서 보나 지금보나 어차피 같은돈!
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
            history.push(`/movie/movieti/6`)
          }}
        >
          현재 생활비가 모자랄 수 있으니 다음에 보자
        </Button>
      </div>
        <Typography variant="h6" align="center" gutterBottom>
          5/13
        </Typography>
    </div>
  )
}

export default Movietipage5
