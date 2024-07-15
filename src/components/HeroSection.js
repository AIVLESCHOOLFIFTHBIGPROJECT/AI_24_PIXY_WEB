import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import heroImage from '../assets/hero.png';

const HeroSection = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <Container>
        <Typography variant="h1" component="h1" gutterBottom>
          PIXY
        </Typography>
        <Typography variant="h2" component="h2" gutterBottom>
          AI STAFF FOR YOU
        </Typography>
        <Button variant="contained" color="primary" size="large">
          자세히 알아보기
        </Button>
      </Container>
    </Box>
  );
};

export default HeroSection;