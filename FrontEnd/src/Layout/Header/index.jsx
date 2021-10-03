import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  AppBar,
  Button,
  useScrollTrigger,
  Slide,
  Box,
  FormControl,
  InputLabel,
  makeStyles,
  withStyles,
  InputBase,
} from '@material-ui/core';
import PropTypes from 'prop-types'



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


const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      // 기본 속성 값 
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    
    padding: '10px 26px 10px 10px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),

    fontFamily: [
      'fontPrimary',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  heroContent: {    
    padding: theme.spacing(3, 0, 3),
    margin: {
      margin: theme.spacing(5),
    },
  },
  search: {
    width: '100%',
    height: '80%',
  },
  sort: {
    width: '100%',
    height: '80%',
  },
  searchLabel: {
    margin: '0px 0px 0px 0px',
    fontSize:"24px"
  },
  button: {
    width: '40%',
  },

}));

const Header = props => {
  let history = useHistory();
  const classes = useStyles();
  const [searchWord, setSearchWord] = useState([]);

  return (
    <HideOnScroll {...props}>
    <AppBar position="relative" style={{ background: '#8561c5', boxShadow: 'none'}}>
      <Grid container  justify="space-between" alignItems="center" spacing={12}
      > 
        <Grid item xs={3}>
            <Button
              // size="small"
              onClick={()=>{
                history.push('/main');
              }}
              variant="contained" color="primary">
              Lead me
            </Button> 
            <Button onClick = { ()=> {history.push("/mypage")}  } variant="contained" color="primary">
            마이페이지
          </Button>  
        </Grid>
                    
        <Grid item xs={6}
          style={{                  
            display: 'flex' ,    
            justifyContent: 'center',
          }} 
        >
            <Box bgcolor="" width="80%">
                <form onSubmit={(e)=>{
                    e.preventDefault();                      
                    history.push('/search') 
                    }}>
                    <FormControl className={classes.search}>
                        <InputLabel placeholder="영화 이름" htmlFor="demo-customized-textbox" className={classes.searchLabel}>영화 이름</InputLabel>
                        {/* <TextField> */}
                          <BootstrapInput 
                            id="demo-customized-textbox"
                            onChange={(e)=>{
                              setSearchWord(e.target.value);
                            }}
                          />
                        {/* </TextField> */}
                        <Button onClick = { ()=> {history.push({
                          pathname:`movie/search/title/${searchWord}`,
                          state:{searchWord:searchWord},
                        })}} variant="contained" color="primary">
                          검색
                        </Button>  
                    </FormControl>
                </form>
            </Box>
          </Grid>
          <Grid item xs={3} 
            style={{                  
              display: 'flex' ,    
              justifyContent: 'end',
            }} 
          >            
              <Button onClick={()=>{
                history.push('/SignIn') //로그인할 수 있게? 추후 변경 가능
              }}
              variant="contained" color="primary" className={classes.button}
              > 
                {/* 사용자 이름으로 넣어지게 수정할 예정 */}
                안녕하세요 ㅁㅁ님  
              </Button>                                       
          </Grid>
      </Grid>
    </AppBar>
  </HideOnScroll>
  );
};

export default Header;
