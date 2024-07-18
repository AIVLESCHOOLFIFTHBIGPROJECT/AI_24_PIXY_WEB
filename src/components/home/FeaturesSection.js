import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, useTheme, useMediaQuery } from '@mui/material';
import sampleImage1 from '../../assets/home_sample1.png';
import sampleImage2 from '../../assets/home_sample2.png';
import sampleImage3 from '../../assets/home_sample3.png';
import sampleImage4 from '../../assets/home_sample4.png';

const FeatureCard = ({ title, image, description }) => (
  <Card sx={{ 
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column',
    width: 300, // 카드의 너비를 300px로 고정
  }}>
    <CardMedia
      component="img"
      sx={{
        width: '100%',
        height: 300,
        objectFit: 'cover',
      }}
      image={image}
      alt={title}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const FeaturesSection = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery('(min-width:1920px)');
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box sx={{ 
      py: 8, 
      bgcolor: 'background.paper',
      px: {
        xs: 2,
        sm: 3,
        md: 4,
        lg: 6,
        xl: '340px',
      }
    }}>
      <Typography 
        variant="h3" 
        component="h2"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          mb: 6,
        }}>
        기능 소개
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        flexWrap: { xs: 'wrap', lg: 'nowrap' }, 
        justifyContent: 'center', 
        gap: 4,
        maxWidth: '1240px',
        margin: '0 auto',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center'
      }}>
        {[
          { title: "고객의 입장 이해하는 목표", image: sampleImage1, description: "AI가 고객의 니즈를 분석하고 이해합니다." },
          { title: "최적화 맞춤형 제품", image: sampleImage2, description: "고객에게 최적화된 제품을 추천합니다." },
          { title: "영상 인식을 통한 동선 분석", image: sampleImage3, description: "고객의 행동 패턴을 분석하여 매장 최적화에 활용합니다." },
          { title: "영상 인식을 통한 도난 감지", image: sampleImage4, description: "이상 행동을 감지하여 도난을 예방합니다." },
        ].map((item, index) => (
          <Box key={index}>
            <FeatureCard
              title={item.title}
              image={item.image}
              description={item.description}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FeaturesSection;