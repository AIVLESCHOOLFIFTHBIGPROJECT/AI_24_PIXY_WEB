import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

const FeatureCard = ({ title, image, description }) => (
  <Card>
    <CardMedia
      component="img"
      height="140"
      image={image}
      alt={title}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const FeaturesSection = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Typography variant="h3" component="h2" align="center" gutterBottom>
        기능 소개
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <FeatureCard
            title="고객의 입장 이해하는 목표"
            image="/path-to-feature-image1.jpg"
            description="AI가 고객의 니즈를 분석하고 이해합니다."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FeatureCard
            title="최적화 맞춤형 제품"
            image="/path-to-feature-image2.jpg"
            description="고객에게 최적화된 제품을 추천합니다."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FeatureCard
            title="행동 산태를 통한 동선 분석"
            image="/path-to-feature-image3.jpg"
            description="고객의 행동 패턴을 분석하여 매장 최적화에 활용합니다."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FeatureCard
            title="행동 산태를 통한 도난 감지"
            image="/path-to-feature-image4.jpg"
            description="이상 행동을 감지하여 도난을 예방합니다."
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeaturesSection;