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
function Movietipage12() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        MoVieTI   
      </Typography>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        Q 12.  
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        미리 찾아봤던 영화 시간표가 다음날 시간표이다. 당신의 선택은?
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
            history.push(`/movie/movieti/13`)
          }}
        >
          근처에 영화관이 있는지 다시 검색해본다
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
            history.push(`/movie/movieti/13`)
          }}
        >
          그럼 되는 시간에 보지뭐, 다른거 하고 있자
        </Button>
      </div>
        <Typography variant="h6" align="center" gutterBottom>
          12/13
        </Typography>
    </div>
  )
}

export default Movietipage12
