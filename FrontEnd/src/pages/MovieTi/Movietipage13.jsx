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
function Movietipage13() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        MoVieTI   
      </Typography>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        Q 13.  
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        내가 본 영화에 대해서 친구가 어땠는지 물어본다. 나는..
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
            history.push(`/movie/movieti/result`)
          }}
        >
          구체적으로 영화의 줄거리를 알려준다.
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
            history.push(`/movie/movieti/result`)
          }}
        >
          영화를 보며 느꼈던 큰 감정에 대해 얘기한다.
        </Button>
      </div>
        <Typography variant="h6" align="center" gutterBottom>
          13/13
        </Typography>
    </div>
  )
}

export default Movietipage13
