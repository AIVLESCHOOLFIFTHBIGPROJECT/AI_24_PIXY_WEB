import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const ServicesSection = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Box sx={{ maxWidth: '800px', mx: 'auto', px: 3 }}>
        <Typography variant="h3" component="h2" gutterBottom>
          AI 점원 <span style={{ color: '#675AFF' }}>픽시</span>는
        </Typography>
        <Typography variant="h3" component="h2" gutterBottom>
          무인화 Smart Retail 분야의
        </Typography>
        <Typography variant="h3" component="h2" gutterBottom>
          혁신을 선도하는 AI 입니다.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
          지원할 비즈니스 모델/매장의 특성을 이해고 있습니다.
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          비즈니스의 알맞은 매출 성장을 도와 드릴게요.
        </Typography>
      </Box>
      
      <Box sx={{ 
        mt: 8, 
        py: 4,
        background: 'linear-gradient(90deg, #675AFF 0%, #5DDFDE 100%)',
        color: 'white'
      }}>
        <Grid container spacing={3} sx={{ maxWidth: '1200px', mx: 'auto' }}>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" align="center">우리 매장 전용 첫봇</Typography>
            <Typography variant="h5" align="center" sx={{ mt: 1, fontWeight: 'bold' }}>
              Custom Pixy
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" align="center">최적의 발주 관리</Typography>
            <Typography variant="h5" align="center" sx={{ mt: 1, fontWeight: 'bold' }}>
              AI Manager
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
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