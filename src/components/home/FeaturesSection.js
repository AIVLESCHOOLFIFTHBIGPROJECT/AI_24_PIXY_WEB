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
  const theme = useTheme();;

  return (
    <Box sx={{ 
      my: 8,
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
          fontSize: 'clamp(1.5rem, 2.5vw, 3rem)',
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
          { title: "매장별 맞춤형 챗봇", image: sampleImage1, description: "AI가 매장 정보에 기반해 고객 문의에 실시간으로 응답합니다." },
          { title: "최적화된 판매량 예측", image: sampleImage2, description: "최적화된 판매량 예측정보를 제공합니다." },
          { title: "영상 인식을 이상 행동 탐지", image: sampleImage3, description: "CCTV 영상 속 절도를 비롯한 이상 행위를 감지합니다." },
          { title: "영상 인식을 통한 화재 감지", image: sampleImage4, description: "CCTV 영상 속 화재를 감지합니다." },
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
