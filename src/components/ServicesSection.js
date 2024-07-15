import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const ServiceCard = ({ title, description }) => (
  <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
    <Typography variant="h5" component="h3" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body1">{description}</Typography>
  </Paper>
);

const ServicesSection = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Typography variant="h3" component="h2" align="center" gutterBottom>
        AI 점원 픽시는 무인화 Smart Retail 분야의 혁신을 선도하는 AI 입니다.
      </Typography>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <ServiceCard 
            title="Custom Pixy" 
            description="우리 매장 전용 점원" 
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ServiceCard 
            title="AI Manager" 
            description="최적의 매장 관리" 
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ServiceCard 
            title="CCTV Check" 
            description="CCTV 실시간 분석" 
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServicesSection;