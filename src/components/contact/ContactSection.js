import React from 'react';
import { Box, Typography, Grid, TextField, Button, useTheme, useMediaQuery } from '@mui/material';
import { keyframes } from '@emotion/react';

const moveGradient = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
`;

const ContactSection = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery('(min-width:1920px)');

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Box sx={{ 
        height: '200px',
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
        }
      }}>
        <Box>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{
              fontWeight: 'bold',
              fontSize: 'clamp(2rem, 3.5vw, 3.25rem)',
            }}
          >
            Contact Us
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 2, 
              color: 'text.secondary',
              fontWeight: 300,
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            }}
          >
            여러분의 소중한 의견을 기다립니다. 아래 양식을 작성해 주세요.
          </Typography>
        </Box>
      </Box>
      
      <Box
        sx={{
          height: '200px',
          position: 'relative',
          overflow: 'hidden',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '200%',
            background: '#675AFF',
          }}
        />
        <Grid container spacing={0} sx={{ maxWidth: '1200px', mx: 'auto', position: 'relative', zIndex: 1 }}>
          <Grid item xs={12} md={4} sx={{ 
            borderRight: { md: '2px solid rgba(255,255,255,0.3)' },
            '&:last-child': { borderRight: 'none' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
          }}>
            <Typography variant="h5" align="center" sx={{ mt: 1, fontWeight: 'bold' }}>Email Us</Typography>
            <Typography variant="body1" align="center" sx={{ mt: 1}}>
              csc4952@pixy.kro.kr
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ 
            borderRight: { md: '2px solid rgba(255,255,255,0.3)' },
            '&:last-child': { borderRight: 'none' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
          }}>
            <Typography variant="h5" align="center" sx={{ mt: 1, fontWeight: 'bold' }}>Call Us</Typography>
            <Typography variant="body1" align="center" sx={{ mt: 1}}>
              010-3548-6683
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
          }}>
            <Typography variant="h5" align="center" sx={{ mt: 1, fontWeight: 'bold' }}>Visit Us</Typography>
            <Typography variant="body1" align="center" sx={{ mt: 1}}>
              대구광역시 북구 고성로 141, KT 북대구 빌딩
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <Box sx={{ maxWidth: 800, width: '100%' }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button variant="contained" color="primary" size="large">
                제출하기
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactSection;
