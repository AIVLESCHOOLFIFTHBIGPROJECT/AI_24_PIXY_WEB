import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import logoHero from '../assets/logo-hero.svg';
import logo from '../assets/logo.svg';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery('(min-width:1920px)');
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const heroSectionHeight = document.getElementById('hero-section')?.offsetHeight || 0;
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
      <Box sx={{
        width: '100%',
        maxWidth: '1920px',
        mx: 'auto',
        px: {
          xs: '5vw',
          sm: '7vw',
          md: '9vw',
          lg: isLargeScreen ? '340px' : 'calc((100vw - 1240px) / 2)',
        }
      }}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%'
          }}>
            <img src={isTop ? logoHero : logo} alt="Pixy Logo" height="30" />
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
              <Button 
                color="inherit" 
                component={Link} 
                to="/" 
                sx={{ 
                  color: isTop ? 'white' : 'black', 
                  fontWeight: 600,
                  fontSize: 'clamp(0.875rem, 1vw, 1rem)'
                }}
              >
                제품 소개
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/about" 
                sx={{ 
                  color: isTop ? 'white' : 'black', 
                  fontWeight: 600,
                  fontSize: 'clamp(0.875rem, 1vw, 1rem)'
                }}
              >
                회사 소개
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/contact" 
                sx={{ 
                  color: isTop ? 'white' : 'black', 
                  fontWeight: 600,
                  fontSize: 'clamp(0.875rem, 1vw, 1rem)'
                }}
              >
                고객 문의
              </Button>
            </Box>
          )}

          <Box>
            <Button 
              color="inherit" 
              component={Link} 
              to="/login" 
              sx={{ 
                color: isTop ? 'white' : 'black', 
                fontWeight: 600,
                fontSize: 'clamp(0.875rem, 1vw, 1rem)'
              }}
            >
              로그인
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/signup" 
              sx={{ 
                color: isTop ? 'white' : 'black', 
                fontWeight: 600,
                fontSize: 'clamp(0.875rem, 1vw, 1rem)'
              }}
            >
              회원가입
            </Button>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Header;