import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import logoHero from '../assets/logo-hero.svg';
import logoBlack from '../assets/logo-black.svg'

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY ;
      const heroSectionHeight = document.getElementById('hero-section').offsetHeight;
      setIsTop(position < heroSectionHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerStyle = {
    transition: 'all 0.3s',
    backgroundColor: isTop ? 'transparent' : 'white',
    boxShadow: isTop ? 'none' : '0px 2px 4px -1px rgba(0,0,0,0.2)',
  };

  return (
    <AppBar position="fixed" elevation={0} sx={headerStyle}>
      <Container maxWidth="xl" sx={{ px: { xl: '340px' } }}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography component="div">
            <img src={isTop ? logoHero : logoBlack} alt="Pixy Logo" height="30" />
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
              <Button color="inherit" component={Link} to="/" sx={{ color: isTop ? 'white' : 'black', fontWeight: 600 }}>제품 소개</Button>
              <Button color="inherit" component={Link} to="/about" sx={{ color: isTop ? 'white' : 'black', fontWeight: 600 }}>회사 소개</Button>
              <Button color="inherit" component={Link} to="/contact" sx={{ color: isTop ? 'white' : 'black', fontWeight: 600 }}>고객 문의</Button>
            </Box>
          )}

          <Box>
            <Button color="inherit" component={Link} to="/login" sx={{ color: isTop ? 'white' : 'black', fontWeight: 600 }}>로그인</Button>
            <Button color="inherit" component={Link} to="/signup" sx={{ color: isTop ? 'white' : 'black', fontWeight: 600 }}>회원가입</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;