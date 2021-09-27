import React from 'react'
import {useHistory} from 'react-router-dom';
import {
  Button,
  Typography,
  makeStyles,
  Grid,
} from '@material-ui/core'
import Layout from '../../Layout';

const useStyles = makeStyles((theme) => ({
  submit: {
    width: '30%',
    margin: theme.spacing(3, 0, 2),

  },
}));
function Movietimain() {
  const classes = useStyles();
  const history = useHistory();

  return (    
    <React.Fragment>
      <Layout>
      </Layout>

      <Grid container spacing={12}>
        <Grid item xs={12} >
          <Typography variant="h2" align="center" color="text.secondary" paragraph>
            나는 어떤 영화 캐릭터와 비슷할까?        
          </Typography>
        </Grid>
        <Grid item xs={12} >
          <Typography variant="h3" align="center" color="text.secondary" paragraph>
            MovieTI      
          </Typography>
        </Grid>

        <Grid item xs={12} 
          style={{
            display: 'flex' ,
            justifyContent: 'center'          
            }} 
        >
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {() => {
              history.push(`/movie/movieti/1`)
            }}
          >
            GoGo!
          </Button>
        </Grid>      
      </Grid>
    </React.Fragment>     
  )
}

export default Movietimain
