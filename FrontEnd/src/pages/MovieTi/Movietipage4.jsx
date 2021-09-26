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
function Movietipage4() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        MoVieTI   
      </Typography>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        Q 04.  
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        귀신이 나온다는 소문이 있는 집에 머물게 된 당신! 자정이 넘은 시각 어디선가 알 수 없는 소리가 들려오는데,,,?
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
            history.push(`/movie/movieti/5`)
          }}
        >
          이미 공포영화 한 편 뚝딱임
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
            history.push(`/movie/movieti/5`)
          }}
        >
          어디서 누가 왜 나는 소리인지 궁금해! 
        </Button>
      </div>
        <Typography variant="h6" align="center" gutterBottom>
          4/13
        </Typography>
    </div>
  )
}

export default Movietipage4
