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
    width: '40%',  
    height: '50%',  
    margin: theme.spacing(3, 0, 2),
    fontSize: '2rem',
  },
}));
function Movietipage3() {
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
        Q 03.  
      </Typography>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        스파이가 된 당신! 당신이 맡게 될 일은?
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
      
        <Typography variant="h6" align="center" gutterBottom>
          3/13
        </Typography>
      </div>
    </Grid>
  </div>
  )
}

export default Movietipage3
