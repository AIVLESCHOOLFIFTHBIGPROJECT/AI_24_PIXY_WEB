import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const SignUpButton = () => {
  return (
    <Button
      component={RouterLink}
      to="/signup"
      sx={{
        height: 120,
        width: '100%',
        padding: 0,
        textTransform: 'none',
        '&:hover': {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: '100%',
          background: 'linear-gradient(90deg, #675AFF 0%, #5DDFDE 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'opacity 0.3s',
          '&:hover': {
            opacity: 0.9,
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: '2rem',
            color: 'white',
            fontWeight: '700',
          }}
        >
          지금 바로 시작하기
        </Typography>
      </Box>
    </Button>
  );
};

export default SignUpButton;