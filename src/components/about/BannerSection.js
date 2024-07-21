import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import aboutBannerImg from '../../assets/about_banner.png';

const BannerSection = () => {
  return (
    <Box
      id="banner-section"
      sx={{
        backgroundImage: `url(${aboutBannerImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        position: 'relative',
        textAlign: 'center'
      }}
    >
      <Box 
        sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          p: 2
        }}
      >
        <Typography 
          variant="h1" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 800,
            fontSize: '3rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          기업 소개
        </Typography>
      </Box>
    </Box>
  );
};

export default BannerSection;
