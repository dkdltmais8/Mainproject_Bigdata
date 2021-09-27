import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Paper,
  Grid,
  AppBar,
  Button,
  useScrollTrigger,
  Slide,
} from '@material-ui/core';
import PropTypes from 'prop-types'
import SearchIcon from '@material-ui/icons/Search';


const HideOnScroll=(props)=>{
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const Header = props => {
  let history = useHistory();

  return (
    <HideOnScroll {...props}>
    <AppBar position="relative" style={{ background: 'transparent', boxShadow: 'none', marginTop:20}}>
      <Grid container justify="space-around" alignItems="center">
        <Grid item style={{marginRight:200}}>
            <Button
              size="small"
              onClick={()=>{
                history.push('/main');
              }}
              variant="contained" color="primary"
              >
              우리팀 로고 들어갈 예정
            </Button> 
        </Grid>
        <Grid item>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Button>
                <SearchIcon 
                  onClick={()=>{
                    history.push('/search')
                  }}
                  variant="contained" color="primary"
                  />
                  Search 부분
              </Button>
            </Grid>
            <Grid item>
              <Paper>
                  <div>
                    <Button onClick={()=>{
                      history.push('/SignIn')
                    }}
                    variant="contained" color="primary"
                    >
                      안녕하세요 ㅁㅁ님(사용자 이름으로 수정 예정)
                    </Button>                                        
                  </div>
              </Paper>        
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  </HideOnScroll>
  );
};

export default Header;
