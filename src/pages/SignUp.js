import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // api.js를 import합니다
import logo from '../assets/logo.svg'; // 로고 이미지 경로를 수정하세요

const SignUp = () => {
  const [formData, setFormData] = useState({
    business_r: null,
    email: '',
    name: '',
    p_num: '',
    r_num: '',
    password: '',
    confirm_password: '',
    is_agreement1: false,
    is_agreement2: false,
    is_agreement3: false,
    store_name: '',
  });
  const [step, setStep] = useState(0);
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

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
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
      //navigate('/login'); 
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입 실패');
    }
  };

  return (
    <Box sx={{height: '100vh', backgroundColor: '#f5f5f5'}}>
      <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '10vh'}}>
        <img src={logo} alt="Pixy Logo" style={{ display: 'block', height: '30px' }} />
      </Box>      
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: 800, p: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 1, height: '80vh' }}>
          <Box>
            {(step === 0 || step === 1) && (
              <Typography variant="h4" align="center" gutterBottom>
                회원가입
              </Typography>
            )}
            {(step === 2 || step === 3) && (
              <Typography variant="h4" align="center" gutterBottom>
                회원가입 완료
              </Typography>
            )}
          </Box>
          <Box>
            {step === 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
              </Box>
            )}
            {step === 1 && (
              <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                <TextField
                  label="Confirm Password"
                  type="password"
                  name="confirm_password"
                  value={formData.confirm_password}
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
              </Box>
            )}
            {step === 2 && (
              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Store Name"
                  name="store_name"
                  value={formData.store_name}
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
                <input
                  type="file"
                  name="business_r"
                  onChange={handleFileChange}
                  required
                />
              </Box>
            )}
            {step === 3 && (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>
                  회원가입 완료
                </Typography>
                <Typography variant="body1" gutterBottom>
                  지금 바로 서비스를 이용해보세요!
                </Typography>
              </Box>
            )}
          </Box>
          <Box>
            {step === 0 && (
              <Button variant="contained" onClick={handleNext}>다음</Button>
            )}
            {(step === 1) && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button variant="outlined" onClick={handleBack}>이전</Button>
                <Button variant="contained" onClick={handleNext}>다음</Button>
              </Box>
            )}
            {(step === 2) && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button variant="outlined" onClick={handleBack}>이전</Button>
                <Button variant="contained" onClick={handleSubmit}>회원가입</Button>
              </Box>
            )}
            {(step === 3) && (
              <Button variant="contained" onClick={() => navigate('/login')}>로그인</Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
