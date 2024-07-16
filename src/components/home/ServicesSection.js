import React from 'react';
import { Box, Typography, Grid, useTheme, useMediaQuery } from '@mui/material';

const ServicesSection = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery('(min-width:1920px)');

  return (
    <Box sx={{bgcolor: 'background.default' }}>
      <Box sx={{ 
        height: '400px',
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
        }
      }}>
        <Box>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{
              fontWeight: 'bold',
              fontSize: 'clamp(2rem, 3.5vw, 3.25rem)',
              // lineHeight: { xs: 1.2, md: 1.3, lg: '100px' },
            }}
          >
            AI 점원 <span style={{ color: '#675AFF' }}>픽시</span>는
          </Typography>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{
              fontWeight: 'bold',
              fontSize: 'clamp(2rem, 3.5vw, 3.25rem)',
              // lineHeight: { xs: 1.2, md: 1.3, lg: '100px' },
            }}
          >
            무인화 Smart Retail 분야의
          </Typography>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{
              fontWeight: 'bold',
              fontSize: 'clamp(2rem, 3.5vw, 3.25rem)',
              // lineHeight: { xs: 1.2, md: 1.3, lg: '100px' },
            }}
          >
            혁신을 선도하는 AI 입니다.
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 2, 
              color: 'text.secondary',
              fontWeight: 300,
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              lineHeight: { xs: 1.5, md: '30px' },
            }}
          >
            지원할 비즈니스 모델/매장의 특성을 이해고 있습니다.
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.secondary',
              fontWeight: 300,
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              lineHeight: { xs: 1.5, md: '30px' },
            }}
          >
            비즈니스의 알맞은 매출 성장을 도와 드릴게요.
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{ 
        height: '200px',  // 높이를 200px로 설정
        background: 'linear-gradient(90deg, #675AFF 0%, #5DDFDE 100%)',
        color: 'white',
        display: 'flex',  // Flexbox를 사용하여 내용물 정렬
        alignItems: 'center',  // 수직 중앙 정렬
      }}>
        <Grid container spacing={0} sx={{ maxWidth: '1200px', mx: 'auto' }}>
          <Grid item xs={12} md={4} sx={{ 
            borderRight: { md: '1px solid rgba(255,255,255,0.3)' },
            '&:last-child': { borderRight: 'none' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',  // 수직 중앙 정렬
            height: '100%',  // Grid 아이템의 높이를 100%로 설정
          }}>
            <Typography variant="body1" align="center">우리 매장 전용 첫봇</Typography>
            <Typography variant="h5" align="center" sx={{ mt: 1, fontWeight: 'bold' }}>
              Custom Pixy
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ 
            borderRight: { md: '1px solid rgba(255,255,255,0.3)' },
            '&:last-child': { borderRight: 'none' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',  // 수직 중앙 정렬
            height: '100%',  // Grid 아이템의 높이를 100%로 설정
          }}>
            <Typography variant="body1" align="center">최적의 발주 관리</Typography>
            <Typography variant="h5" align="center" sx={{ mt: 1, fontWeight: 'bold' }}>
              AI Manager
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',  // 수직 중앙 정렬
            height: '100%',  // Grid 아이템의 높이를 100%로 설정
          }}>
            <Typography variant="body1" align="center">CCTV 실시간 분석</Typography>
            <Typography variant="h5" align="center" sx={{ mt: 1, fontWeight: 'bold' }}>
              CCTV Check
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ServicesSection; 