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
function Movietipage9() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        MoVieTI   
      </Typography>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        Q 09.  
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        시험을 못봐서 우울해하는 친구에게 당신이 해줄 말은? 
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
            history.push(`/movie/movieti/10`)
          }}
        >
          우리 영화보고 맛있는거 먹으러가자!
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
            history.push(`/movie/movieti/10`)
          }}
        >
          다음에 잘하면 돼! 이번 시험 다들 어려웠대!
        </Button>
      </div>
        <Typography variant="h6" align="center" gutterBottom>
          9/13
        </Typography>
    </div>
  )
}

export default Movietipage9
