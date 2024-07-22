import React from 'react';
import { Box, Typography, Grid, useTheme, useMediaQuery } from '@mui/material';
import customLLMImg from '../../assets/home_sample1.png';

const CustomLLMSection = () => {
    const isLargeScreen = useMediaQuery('(min-width:1920px)');
  return (
    <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '1920px',
        mx: 'auto',
        px: {
          xs: '5vw',
          sm: '7vw',
          md: '9vw',
          lg: isLargeScreen ? '340px' : 'calc((100vw - 1240px) / 2)',
        } }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <img src={customLLMImg} alt="Custom LLM" style={{ width: '100%', height: 'auto' }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h2" gutterBottom>
            Custom LLM Section
          </Typography>
          <Typography variant="body1" paragraph>
            - 각 매장별로 챗봇을 학습 및 커스텀하여 매장 전용 챗봇 구성
          </Typography>
          <Typography variant="body1" paragraph>
            - STT, TTS를 활용한 음성 대화 지원
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomLLMSection;
