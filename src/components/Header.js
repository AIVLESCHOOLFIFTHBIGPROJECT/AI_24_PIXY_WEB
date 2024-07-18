import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import logoHero from '../assets/logo-hero.svg';
import logo from '../assets/logo.svg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Header = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const isLargeScreen = useMediaQuery('(min-width:1920px)');
  const [isTop, setIsTop] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const heroSectionHeight = document.getElementById('hero-section')?.offsetHeight || 0;
      setIsTop(position < heroSectionHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const headerStyle = {
    transition: 'all 0.3s',
    backgroundColor: isTop ? 'transparent' : 'white',
    boxShadow: isTop ? 'none' : '0px 2px 4px -1px rgba(0,0,0,0.2)',
  };

  const buttonStyle = {
    color: isTop ? 'white' : 'black', 
    fontWeight: 600,
    fontSize: 'clamp(0.875rem, 1vw, 1rem)'
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={isTop ? logoHero : logo} alt="Pixy Logo" height="30" />
          </Box>

          {!isSmallScreen && (
            <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
              <Button color="inherit" component={Link} to="/" sx={buttonStyle}>제품 소개</Button>
              <Button color="inherit" component={Link} to="/about" sx={buttonStyle}>회사 소개</Button>
              <Button color="inherit" component={Link} to="/contact" sx={buttonStyle}>고객 문의</Button>
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" component={Link} to="/login" sx={buttonStyle}>
              로그인
            </Button>
            <Button color="inherit" component={Link} to="/signup" sx={buttonStyle}>
              회원가입
            </Button>
            {isSmallScreen && (
              <>
                <Button
                  color="inherit"
                  onClick={handleMenu}
                  sx={{
                    ...buttonStyle,
                    display: 'flex',
                    alignItems: 'center',
                    ml: 1,
                  }}
                >
                  메뉴 <KeyboardArrowDownIcon />
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={handleClose} component={Link} to="/">제품 소개</MenuItem>
                  <MenuItem onClick={handleClose} component={Link} to="/about">회사 소개</MenuItem>
                  <MenuItem onClick={handleClose} component={Link} to="/contact">고객 문의</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Header;