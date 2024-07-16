import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // api.js를 import합니다
import Cookies from 'js-cookie';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

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
      const { access, refresh } = response.data;
      // 토큰을 쿠키에 저장
      Cookies.set('access_token', access, { httpOnly: true, secure: true });
      Cookies.set('refresh_token', refresh, { httpOnly: true, secure: true });
      alert('로그인 성공');
      navigate('/main/dashboard'); // 로그인 후 리다이렉트
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인 실패');
    }
  };

  return (
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
      <Button type="submit" variant="contained">로그인</Button>
    </Box>
  );
};

export default Login;
