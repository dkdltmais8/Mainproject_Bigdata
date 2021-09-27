import * as React from "react";
import Avatar from '@material-ui/core/Avatar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@material-ui/core/Grid';
import Layout from '../../Layout';

function MyPage() {
    return (
      <Layout>        
      <div style={{margin:"15%", border:"solid 2px"}}>        
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <h3>MyPage</h3>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            >
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'primary' }}>
                <List>
                  <ListItem disablePadding style={{margin:"auto"}}>
                    <ListItemButton>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary="내 취향 분석" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary="내가 찜한 목록" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary="회원 정보 수정" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary="회원 탈퇴" />
                    </ListItemButton>
                  </ListItem>
                </List>
            </Box>
          </Grid>
        </Grid>
      </div>
      </Layout>
    );
  
}

export default MyPage;