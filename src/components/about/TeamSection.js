import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
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
    <CardContent sx={{ flexGrow: 1, px:5 }}>
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
          { title: "CEO_최성찬", image: cscImg, description: "경력1 \n 경력2 \n 경력3" },
          { title: "역할_노재훈", image: rjhImg, description: "경력1 \n 경력2 \n 경력3" },
          { title: "역할_홍성윤", image: hsyImg, description: "경력1 \n 경력2 \n 경력3" },
          { title: "역할_김도영", image: kdyImg, description: "경력1 \n 경력2 \n 경력3" },
          { title: "역할_배성준", image: bsjImg, description: "경력1 \n 경력2 \n 경력3" },
          { title: "역할_정우섭", image: jwsImg, description: "경력1 \n 경력2 \n 경력3" },
          { title: "역할_조성민", image: jsmImg, description: "경력1 \n 경력2 \n 경력3" },
          { title: "역할_신민철", image: smcImg, description: "경력1 \n 경력2 \n 경력3" },
          { title: "역할_박유빈", image: pypImg, description: "경력1 \n 경력2 \n 경력3" },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
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
