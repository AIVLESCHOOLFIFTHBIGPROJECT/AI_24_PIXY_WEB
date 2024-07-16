import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import heroImage from '../../assets/hero.png';

const HeroSection = () => {
  return (
    <Box
      id="hero-section"
      sx={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <Box sx={{ textAlign: 'center', width: '100%'}}>
        <Typography 
          variant="h1" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 800,
            fontSize: '5rem'
          }}
        >
          PIXY
        </Typography>
        <Typography variant="h2" 
          component="h2" 
          gutterBottom
          sx={{
            fontWeight: 800,
            fontSize: '5rem'
          }}>
          AI STAFF FOR YOU
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroSection;