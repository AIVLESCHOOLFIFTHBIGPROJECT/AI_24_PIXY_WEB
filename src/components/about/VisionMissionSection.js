import React from 'react';
import { Box, Typography, useTheme, useMediaQuery, Grid } from '@mui/material';

const VisionMissionSection = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery('(min-width:1920px)');

  return (
    <Box sx={{ bgcolor: '#675AFF', color: 'white', py: 8 }}>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1400px', // 최대 너비를 1400px로 설정
        mx: 'auto',
        px: {
          xs: 2,
          sm: 4,
          md: 6,
          lg: 8,
        }
      }}>
        <Typography 
          variant="h3" 
          component="h2"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            mb: 4,
          }}
        >
          Our Vision & Mission
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center', px: 2 }}>
              <Typography 
                variant="h4" 
                component="h3" 
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                }}
              >
                Our Vision
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mt: 2, 
                  fontWeight: 300,
                  fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                  mb: 1,
                }}
              >
                픽시는 모든 오프라인 리테일의 무인 스마트화를 목표로 합니다.
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 300,
                  fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                  mb: 1,
                }}
              >
                챗봇과 분석 AI와 비전 AI를 활용하여 무인화를 지원하며,
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 300,
                  fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                }}
              >
                인류의 더 나은 삶을 꿈꾸고 있습니다.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center', px: 2 }}>
              <Typography 
                variant="h4" 
                component="h3" 
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                }}
              >
                Our Mission
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mt: 2, 
                  fontWeight: 300,
                  fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                  mb: 1,
                }}
              >
                안정적인 무인 스마트화를 위해
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 300,
                  fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                  mb: 1,
                }}
              >
                혁신과 신뢰성 구축에 전념하고 있습니다. 지속 가능한 성장으로,
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 300,
                  fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                }}
              >
                기업을 넘어 매장과 방문 고객의 성장을 도모하고자 합니다.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default VisionMissionSection;
