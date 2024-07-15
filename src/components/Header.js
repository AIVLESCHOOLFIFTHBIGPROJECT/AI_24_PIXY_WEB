// GNB
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Header = () => {
  return (
    <AppBar position="fixed" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src={logo} alt="Pixy Logo" height="30" />
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">제품 소개</Button>
          <Button color="inherit" component={Link} to="/pricing">요금제</Button>
          <Button color="inherit" component={Link} to="/contact">고객 문의</Button>
          <Button color="inherit" component={Link} to="/login">로그인</Button>
          <Button color="inherit" component={Link} to="/signup">회원가입</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;