import React from 'react'
import {useHistory} from 'react-router-dom';
import {
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  submit: {
    width: '10%',
    margin: theme.spacing(3, 0, 2),

  },
}));
function Movietimain() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        나는 어떤 영화 캐릭터와 비슷할까?        
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        MovieTI      
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
            history.push(`/movie/movieti/1`)
          }}
        >
          GoGo!
        </Button>
      </div>
    </div>
  )
}

export default Movietimain
