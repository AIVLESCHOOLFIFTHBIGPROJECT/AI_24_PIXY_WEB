import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api'; // api.js를 import합니다
import { useUser } from '../contexts/UserContext'; // UserContext를 import합니다
import logo from '../assets/logo.svg'; // 로고 이미지 경로를 수정하세요
import ProtectedRoute from '../components/ProtectedRoute';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { login } = useUser(); // Context에서 login 함수를 가져옵니다

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/user/login/normal/', formData);
      const { access_token, refresh, user_id, name } = response.data;
      sessionStorage.setItem('access_token', access_token);

      // 사용자 정보를 Context와 세션 스토리지에 저장
      const userData = { user_id, name };
      login(userData);

      alert('로그인 성공');
      navigate('/main/dashboard', { replace: true }); // 로그인 후 리다이렉트
    } catch (error) {
      console.error('로그인 실패:', error.response.data);
      alert(`로그인 실패: ${error.response.data.detail}`);
    }
  };

  return (
    <ProtectedRoute>
      <Box sx={{ backgroundColor: '#f5f5f5'}} >
        <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '10vh'}}>
          <Link to="/">
            <img src={logo} alt="Pixy Logo" style={{ display: 'block', height: '30px' }} />
          </Link>
        </Box>      
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 320, p: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 1, height: '80vh' }}>
            <Box>
                <Typography variant="h4" align="center" gutterBottom>
                  로그인
                </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Button type="submit" variant="contained" sx={{width: '300px'}}>로그인</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ProtectedRoute>
  );
};

export default Login;
