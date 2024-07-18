import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';
import logoGray from '../assets/logo-gray.svg';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#f8f9fa', py: 2, borderTop: '1px solid #e9ecef' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <img src={logoGray} alt="Pixy Logo" style={{ height: '20px', marginRight: '10px' }} />
          <Typography variant="body2" color="text.secondary" fontWeight='700'>
            이용약관 | 개인정보처리방침
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          회사명: (주)픽시코퍼레이션 | 대표: 최성찬
        </Typography>
        <Typography variant="body2" color="text.secondary">
          주소: 대구광역시 북구 고성로 141, KT 북대구빌딩
        </Typography>
        <Typography variant="body2" color="text.secondary">
          이메일: csc4952@pixy.co.kr | 연락처: 010-3548-6683
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          사업자 등록번호: 000-00-00000 | 통신판매업 신고: 제0000-대구OO-0000호
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Copyright © Pixy Inc. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;