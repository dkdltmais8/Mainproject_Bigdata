import React from 'react'
import {useHistory} from 'react-router-dom';
import {
  Button,
  Typography,
  makeStyles,
  Grid,
} from '@material-ui/core'
import MovietiHeader from '../../components/MovietiHeader'

const useStyles = makeStyles((theme) => ({
  submit: {
    width: '45%',  
    height: '50%',  
    margin: theme.spacing(3, 0, 2),
    fontSize: '2rem',    
  },
}));
function Movietipage13() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <MovietiHeader />
      <Grid container spacing={12}
        style={{
          display: 'flex' ,
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: 50
          }}
      >        
      <Typography variant="h2" align="center" color="text.secondary" paragraph>
        Q 13.  
      </Typography>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        내가 본 영화에 대해서 친구가 어땠는지 물어본다. 나는..
      </Typography>
      <div 
        style={{
          display: 'flex' ,
          flexDirection: 'column',
          alignItems:"center",
          marginTop: 50
          }}
      >
        <Button
          type="submit"          
          variant="contained"
          color="primary"          
          className={classes.submit}          
          onClick = {() => {
            history.push(`/movie/movieti/result`)
          }}
        >
          구체적으로 영화의 줄거리를 알려준다.
        </Button>              
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
        <Typography variant="h6" align="center" gutterBottom>
          13/13
        </Typography>
      </div>
    </Grid>
  </div>
  )
}

export default Movietipage13
