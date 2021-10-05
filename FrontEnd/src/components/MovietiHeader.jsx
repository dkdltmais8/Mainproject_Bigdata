import React from 'react'
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Grid,
  AppBar,
  Button,
} from '@material-ui/core';

function MovietiHeader() {
  const history = useHistory();

  return (
    <div>
      <AppBar position="relative" style={{ background: 'transparent', boxShadow: 'none', marginTop:20}}>
        <Grid container justify="space-around" alignItems="center">
          <Grid item style={{marginRight:200}}>
            <Button
              size="large"
              onClick={()=>{
                history.push('/main');
              }}
              variant="contained" color="primary"
              >
              메인페이지로 가기
            </Button>
          </Grid>
                
          <Typography variant="h3" align="center" color="text.secondary" paragraph style={{marginRight:250}}>
            MovieTI      
          </Typography>
          
          <Grid item>
            <Button                  
              size="large"
              variant="contained" color="primary"
              >                  
              LEAD ME
            </Button>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  )
}

export default MovietiHeader
