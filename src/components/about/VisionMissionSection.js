import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

const VisionMissionSection = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery('(min-width:1920px)');

  return (
    <Box sx={{ bgcolor: '#675AFF', color: 'white', py: 6 }}>
      <Box sx={{ 
        display: 'flex',
        py: 6,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1240px',
        mx: 'auto',
        px: {
          xs: '5vw',
          sm: '7vw',
          md: '9vw',
          lg: isLargeScreen ? '340px' : 'calc((100vw - 1240px) / 2)',
        }
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
          <Box sx={{ width: '48%' }}>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom
              sx={{
                fontWeight: 'bold',
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                textAlign: 'center',
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
                textAlign: 'center',
              }}
            >
              픽시는 모든 오프라인 리테일의 무인 스마트화를 목표로 합니다.
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 300,
                fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                textAlign: 'center',
              }}
            >
              챗봇과 분석 AI와 비전 AI를 활용하여 무인화를 지원하며,
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 300,
                fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                textAlign: 'center',
              }}
            >
              인류의 더 나은 삶을 꿈꾸고 있습니다.
            </Typography>
          </Box>
          <Box sx={{ width: '48%' }}>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom
              sx={{
                fontWeight: 'bold',
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                textAlign: 'center',
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
                textAlign: 'center',
              }}
            >
              안정적인 무인 스마트화를 위해
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 300,
                fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                textAlign: 'center',
              }}
            >
              혁신과 신뢰성 구축에 전념하고 있습니다. 지속 가능한 성장으로,
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 300,
                fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                textAlign: 'center',
              }}
            >
              기업을 넘어 매장과 방문 고객의 성장을 도모하고자 합니다.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VisionMissionSection; 
