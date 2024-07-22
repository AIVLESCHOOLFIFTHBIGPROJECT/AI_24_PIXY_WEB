import React from 'react';
import { Box, Typography, Grid, useMediaQuery } from '@mui/material';
import salesImg from '../../assets/home_sample2.png';

const SalesSection = () => {
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
          <Typography variant="h4" component="h2" gutterBottom>
            Sales Section
          </Typography>
          <Typography variant="body1" paragraph>
            - 이전의 판매 데이터를 바탕으로 추후의 판매량을 예측하여 물품 발주 지원
          </Typography>
          <Typography variant="body1" paragraph>
            - 날씨 데이터 등 다양한 데이터를 추가적으로 사용하여 더욱 정밀하고 특화된 예측 제공
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src={salesImg} alt="Sales" style={{ width: '100%', height: 'auto' }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalesSection;
