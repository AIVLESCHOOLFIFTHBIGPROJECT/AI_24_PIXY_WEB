import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import sampleImage1 from '../../assets/home_sample1.png';
import sampleImage2 from '../../assets/home_sample2.png';
import sampleImage3 from '../../assets/home_sample3.png';
import sampleImage4 from '../../assets/home_sample4.png';

const FeatureCard = ({ title, image, description }) => (
  <Card>
    <CardMedia
      component="img"
      height="200"
      image={image}
      alt={title}
    />
    <CardContent>
      <Typography gutterBottom variant="h6" component="div">
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
            image={sampleImage1}
            description="AI가 고객의 니즈를 분석하고 이해합니다."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FeatureCard
            title="최적화 맞춤형 제품"
            image={sampleImage2}
            description="고객에게 최적화된 제품을 추천합니다."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FeatureCard
            title="행동 산태를 통한 동선 분석"
            image={sampleImage3}
            description="고객의 행동 패턴을 분석하여 매장 최적화에 활용합니다."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FeatureCard
            title="행동 산태를 통한 도난 감지"
            image={sampleImage4}
            description="이상 행동을 감지하여 도난을 예방합니다."
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeaturesSection;