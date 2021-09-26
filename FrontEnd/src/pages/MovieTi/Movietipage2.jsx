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
function Movietipage2() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        MoVieTI   
      </Typography>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        Q 02.  
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        같이 영화를 보러가기로 한 친구가 늦어서 영화를 못보게 된 당신! 친구에게 듣고 싶은 말은?
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
            history.push(`/movie/movieti/3`)
          }}
        >
          왜 늦었는지 이유가 궁금해
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
            history.push(`/movie/movieti/3`)
          }}
        >
          변명은 나중에, 사과부터 해야지
        </Button>
      </div>
        <Typography variant="h6" align="center" gutterBottom>
          2/13
        </Typography>
    </div>
  )
}

export default Movietipage2
