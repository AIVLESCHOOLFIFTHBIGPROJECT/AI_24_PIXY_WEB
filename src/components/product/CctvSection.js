import React from 'react';
import { Box, Typography, Grid, useMediaQuery } from '@mui/material';
import cctvImg from '../../assets/home_sample3.png';

const CCTVSection = () => {
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
          <img src={cctvImg} alt="CCTV" style={{ width: '100%', height: 'auto' }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h2" gutterBottom>
          무인매장을 위한 CCTV 기반 AI 기술          
          </Typography>
          <Typography variant="body1" paragraph>
          PIXY는 무인매장을 위한 혁신적인 CCTV 기반 AI 기술을 도입하여, 절도 행동 detection과 화재 detection 시스템을 제공합니다. 이 시스템들은 YOLOv8n 모델을 파인튜닝하여 무인매장의 보안과 안전성을 크게 향상시킵니다.          
          </Typography>
          <Typography variant="h5" paragraph>
          - 절도 행동 Detection
          </Typography>
          <Typography variant="body1" paragraph>
          PIXY는 CCTV 기반 절도 행동 detection에 혁신적인 접근 방식을 도입하여 보안 시스템의 새로운 기준을 제시하고 있습니다. 우리의 시스템은 다음과 같은 기술적 절차를 통해 절도 행동을 실시간으로 감지하고 분석합니다.          
          </Typography>
          <Typography variant="h5" paragraph>
          - 화재 Detection 시스템
          </Typography>
          <Typography variant="body1" paragraph>
          PIXY는 무인매장을 위한 화재 detection 시스템을 개발하였습니다. 이 시스템은 YOLOv8n 모델을 파인튜닝하여 무인매장에서 발생할 수 있는 화재를 실시간으로 감지하고 분석합니다.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CCTVSection;
