import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // api.js를 import합니다

const SignUp = () => {
  const [formData, setFormData] = useState({
    business_r: null,
    email: '',
    name: '',
    p_num: '',
    r_num: '',
    password: '',
    is_agreement1: false,
    is_agreement2: false,
    is_agreement3: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      business_r: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await api.post('/api/user/signup/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('회원가입 성공');
      navigate('/login'); 
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입 실패');
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
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Phone Number"
        name="p_num"
        value={formData.p_num}
        onChange={handleChange}
        required
      />
      <TextField
        label="Registration Number"
        name="r_num"
        value={formData.r_num}
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
      <input
        type="file"
        name="business_r"
        onChange={handleFileChange}
        required
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.is_agreement1}
            onChange={handleChange}
            name="is_agreement1"
          />
        }
        label="개인정보수집동의"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.is_agreement2}
            onChange={handleChange}
            name="is_agreement2"
          />
        }
        label="이용약관동의"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.is_agreement3}
            onChange={handleChange}
            name="is_agreement3"
          />
        }
        label="마케팅활용동의"
      />
      <Button type="submit" variant="contained">회원가입</Button>
    </Box>
  );
};

export default SignUp;
