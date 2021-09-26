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
function Movietipage10() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        MoVieTI   
      </Typography>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        Q 10.  
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        영화를 보는데 열린 결말로 끝났다! 당신의 행동은?
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
            history.push(`/movie/movieti/11`)
          }}
        >
          감독의 의도를 생각하고 찾아보다가 만다
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
            history.push(`/movie/movieti/11`)
          }}
        >
          열린결말이니 내 마음대로 상상하고 만족해한다
        </Button>
      </div>
        <Typography variant="h6" align="center" gutterBottom>
          10/13
        </Typography>
    </div>
  )
}

export default Movietipage10
