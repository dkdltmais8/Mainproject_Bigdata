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
function Movietipage8() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        MoVieTI   
      </Typography>
      <Typography variant="h3" align="center" color="text.secondary" paragraph>
        Q 08.  
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        영화 원데이클래스에 참여하게 된 당신! 
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
            history.push(`/movie/movieti/9`)
          }}
        >
          저도 그 영화 재밌게봤어요, 대화에 적극적으로 참여한다.
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
            history.push(`/movie/movieti/9`)
          }}
        >
          다른사람들이 하는말을 들으며 고개를 끄덕이며 공감의 표시를 한다. 
        </Button>
      </div>
        <Typography variant="h6" align="center" gutterBottom>
          8/13
        </Typography>
    </div>
  )
}

export default Movietipage8
