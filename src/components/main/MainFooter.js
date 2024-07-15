import React from 'react';
import { Box, Typography, Container, Grid, Link } from '@mui/material';

const MainFooter = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Pixy
            </Typography>
            <Typography variant="body2" color="text.secondary">
              AI 기반의 스마트 리테일 솔루션
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              연락처
            </Typography>
            <Typography variant="body2" color="text.secondary">
              서울특별시 강남구 테헤란로 123
              <br />
              Email: info@pixy.ai
              <br />
              Phone: +82 02-1234-5678
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              링크
            </Typography>
            <Link href="#" color="inherit" display="block">홈</Link>
            <Link href="#" color="inherit" display="block">서비스</Link>
            <Link href="#" color="inherit" display="block">가격</Link>
            <Link href="#" color="inherit" display="block">문의하기</Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://pixy.ai/">
              Pixy
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default MainFooter;