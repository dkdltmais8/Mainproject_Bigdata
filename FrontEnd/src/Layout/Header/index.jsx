import React, {useState, useEffect} from 'react';
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
import { getBottomNavigationActionUtilityClass } from '@mui/material';



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
  // const [name, setName] = useState('');

  // useEffect(() => {
  //   name = localStorage.nickname    
  // ,[]
  // );

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
                            // onChange={(e)=>{
                            //   setSearchWord(e.target.value);  API로 보낼 단어
                            // }}
                          />
                        {/* </TextField> */}
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
            {/* {setName ?
            <Button onClick={()=>{
              history.push('/mypage') //로그인할 수 있게? 추후 변경 가능
            }}
            variant="contained" color="primary" className={classes.button}
            >                 
              안녕하세요 {setName}님!
            </Button>    
            :
            <Button onClick={()=>{
              history.push('/SignIn') //로그인할 수 있게? 추후 변경 가능
            }}
            variant="contained" color="primary" className={classes.button}
            >                 
              SignIn
            </Button>  
            }                       */}
          </Grid>
      </Grid>
    </AppBar>
  </HideOnScroll>
  );
};

export default Header;
