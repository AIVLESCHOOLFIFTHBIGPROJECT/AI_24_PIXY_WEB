import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const MainHeader = () => {
  return (
    <AppBar position='fixed' color="default" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src={logo} alt="Pixy Logo" height="30" />
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/main/notifications">알림</Button>
          <Button color="inherit">로그아웃</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;