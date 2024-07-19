import React from 'react';
import { Box, Typography, Grid, useTheme, useMediaQuery } from '@mui/material';
import { keyframes } from '@emotion/react';

const CompanySection = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery('(min-width:1920px)');

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Box sx={{ 
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{
              fontWeight: 'bold',
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              // lineHeight: { xs: 1.2, md: 1.3, lg: '100px' },
            }}
          >
            픽시는 무인화 스마트 리테일 분야의 통합 솔루션을 제공합니다.
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 2, 
              fontWeight: 300,
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              // lineHeight: { xs: 1.5, md: '30px' },
            }}
          >
            단순한 접객을 넘어서 방문 고객과의 대화를 통해 직접 판단하는 커스텀 챗봇과
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: 300,
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              // lineHeight: { xs: 1.5, md: '30px' },
            }}
          >
            판매 데이터를 분석하고 예측하며, 비전 AI기술을 활용한 매장 관리 플랫폼을 제공함으로써
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: 300,
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              // lineHeight: { xs: 1.5, md: '30px' },
            }}
          >
            무인 매장의 4차 산업 혁명을 선도하고 있습니다.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CompanySection; 