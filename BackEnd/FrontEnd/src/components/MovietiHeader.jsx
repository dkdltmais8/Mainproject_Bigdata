import React from 'react'
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Grid,
  AppBar,
  Button,
  makeStyles,
} from '@material-ui/core';
import {AiFillHome} from "react-icons/ai";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.common.white,
  },
}));

function MovietiHeader() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <AppBar position="relative" style={{ background: 'transparent', boxShadow: 'none', marginTop:20}}>
        <Grid container justify="space-around" alignItems="center">
          <Grid item style={{marginRight:200}}>
          <AiFillHome
              // size="small"
              onClick={()=>{
                history.push('/main');
              }}
              style={{ fontSize: '30px', color: 'violet' }}>
            </AiFillHome> 
          </Grid>
                
          <Typography variant="h3" align="center" paragraph style={{marginRight:250, color:"white"}}>
            MovieTI      
          </Typography>
          
          <Grid item>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  )
}

export default MovietiHeader
