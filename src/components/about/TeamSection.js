import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid, useMediaQuery } from '@mui/material';
import cscImg from '../../assets/people/cscImg.png';
import rjhImg from '../../assets/people/rjhImg.png';
import hsyImg from '../../assets/people/hsyImg.png';
import kdyImg from '../../assets/people/kdyImg.png';
import bsjImg from '../../assets/people/bsjImg.png';
import jwsImg from '../../assets/people/jwsImg.png';
import jsmImg from '../../assets/people/jsmImg.png';
import smcImg from '../../assets/people/smcImg.png';
import pypImg from '../../assets/people/pypImg.png';

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
        py: 3,
        width: '100%',
        height: 307, // 원래 높이와 일치하도록 설정
        objectFit: 'contain',
      }}
      image={image}
      alt={title}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      {description.split('\n').map((line, index) => (
        <Typography key={index} variant="body2" color="text.secondary">
          {line}
        </Typography>
      ))}
    </CardContent>
  </Card>
);

const TeamSection = () => {
  const isLargeScreen = useMediaQuery('(min-width:1080px)');
  const isMediumScreen = useMediaQuery('(min-width:680px) and (max-width:1079px)');
  const isSmallScreen = useMediaQuery('(max-width:679px)');

  return (
    <Box sx={{ 
      py: 8, 
      bgcolor: 'black',
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
          color: 'white',
          fontWeight: 'bold',
          fontSize: 'clamp(1.5rem, 2.5vw, 3rem)',
          mb: 6,
        }}>
        Our Team
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {[
          { title: "최성찬", image: cscImg, description: "- 코딩 교육 플랫폼, MicroLearnable 개발 및 운영 \n - IT연합 동아리 PARD 공식 어플 개발 \n - chuchu.gg 개발 및 운영" },
          { title: "노재훈", image: rjhImg, description: "- 한국정보기술학회 수중 센서 네트워크 논문 다수 게재 \n - 주식회사 피아농 대표 역임 및 예비창업패키지 최우수 수료 \n - NFT 민팅 사이트 ANDNEW Ticket 개발 및 운영" },
          { title: "홍성윤", image: hsyImg, description: "- 금오공과대학교 컴퓨터공학과 학사 졸업 \n - 웹킷 공모전 장려상 수상 \n - 정보처리기사, sqld 자격증 보유" },
          { title: "김도영", image: kdyImg, description: "- 한동대학교 컴퓨터공학심화 학사 졸업 \n - KT AIVLE School AI 개발자 트랙 \n - BCI (Brain Computer Interface) 연구실 연구생 (2023.2~)" },
          { title: "배성준", image: bsjImg, description: "- 대구가톨릭대학교 컴퓨터공학 학사 졸업 \n - KT AIVLE School AI 개발자 트랙 \n - 경북, 영천 공모전 수상" },
          { title: "정우섭", image: jwsImg, description: "- KT AIVLE School AI 개발자 트랙 \n - 한동대학교 컴퓨터공학부 졸업 \n -LG Aimers 수료" },
          { title: "조성민", image: jsmImg, description: "- 한동대학교 컴퓨터공학, 전자공학 학사 졸업 \n - KT AIVLE School AI 개발자 트랙 \n - KCC 학부생 논문 우수상" },
          { title: "신민철", image: smcImg, description: "- 경북대학교 학사 졸업 \n - EGCP 연구실 연구생(2023.2~) \n -경북, 영천 공모전 수상" },
          { title: "박유빈", image: pypImg, description: "- KT AIVLE School AI 개발자 트랙 \n - 2023 4th Google Machine Learning Bootcamp \n - AICE Associate, TensorFlow Developer Certificate 등 보유" },
        ].map((item, index) => (
          <Grid 
            item 
            key={index} 
            xs={12} 
            sm={isSmallScreen ? 12 : isMediumScreen ? 6 : 4}
            md={isSmallScreen ? 12 : isMediumScreen ? 6 : 4}
            lg={isSmallScreen ? 12 : isMediumScreen ? 6 : 4}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <FeatureCard
              title={item.title}
              image={item.image}
              description={item.description}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TeamSection;
