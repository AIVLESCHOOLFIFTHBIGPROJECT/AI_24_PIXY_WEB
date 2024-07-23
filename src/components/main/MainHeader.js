import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import api from '../../api'; // api.js를 import합니다
import { useUser } from '../../contexts/UserContext'; // UserContext를 import합니다
import { Menu, MenuItem, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const MainHeader = () => {
  const isSmallScreen = useMediaQuery('(max-width:1200px)');
  const navigate = useNavigate();
  const { logout } = useUser(); // Context에서 logout 함수를 가져옵니다
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const buttonStyle = {
    color: 'black',
    fontWeight: 600,
    fontSize: 'clamp(0.875rem, 1vw, 1rem)'
  };

  return (
    <AppBar position='fixed' color="default" elevation={0}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', background: "white" }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          height: '100%'
        }}>
          <img src={logo} alt="Pixy Logo" height="30" />
        </Box>
        {
          !isSmallScreen &&
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={Link} to="/main/notifications">알림</Button>
            <Button color="inherit" onClick={handleLogout}>로그아웃</Button>
          </Box>
        }
        {
          isSmallScreen &&
          <>
            <Box sx={{display: 'flex'}}>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button color="inherit" component={Link} to="/main/notifications">알림</Button>
                <Button color="inherit" onClick={handleLogout}>로그아웃</Button>
              </Box>          <Button
                color="inherit"
                onClick={handleMenu}
                sx={{
                  ...buttonStyle,
                  display: 'flex',
                  alignItems: 'center',
                  ml: 1,
                }}
              >
                메뉴 <KeyboardArrowDownIcon />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleClose} component={Link} to="/main/dashboard">대시보드</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/main/pixycustom">픽시커스텀</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/main/sales">판매/재고</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/main/predictsales">판매/예측</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/main/cctv">CCTV</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/main/cctvfire">CCTV-Fire</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/main/inquiry">문의 게시판</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/main/notice">공지사항</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/main/settings">설정</MenuItem>
              </Menu>
            </Box>

          </>
        }
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;
