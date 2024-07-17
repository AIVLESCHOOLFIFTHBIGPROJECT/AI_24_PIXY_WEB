import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import api from '../../api'; // api.js를 import합니다
import { useUser } from '../../contexts/UserContext'; // UserContext를 import합니다

const MainHeader = () => {
  const navigate = useNavigate();
  const { logout } = useUser(); // Context에서 logout 함수를 가져옵니다

  const handleLogout = async () => {
    try {
      await api.post('/api/user/logout/normal/', {}, {
        withCredentials: true,  // 쿠키를 포함한 요청을 보냅니다
      });

      // 사용자 정보 초기화
      logout();
      
      // 로그인 페이지로 리디렉션
      navigate('/login');
      alert('로그아웃 성공');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert('로그아웃 실패');
    }
  };

  return (
    <AppBar position='fixed' color="default" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src={logo} alt="Pixy Logo" height="30" />
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/main/notifications">알림</Button>
          <Button color="inherit" onClick={handleLogout}>로그아웃</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;
