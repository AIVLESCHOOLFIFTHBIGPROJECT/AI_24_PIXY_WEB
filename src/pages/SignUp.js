import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Box, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api'; // api.js를 import합니다
import logo from '../assets/logo.svg'; // 로고 이미지 경로를 수정하세요
import ProtectedRoute from '../components/ProtectedRoute';

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
    verification_code: '',
  });
  const [errors, setErrors] = useState({});
  const [isAgreementAll, setIsAgreementAll] = useState(false);
  const [step, setStep] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.is_agreement1 && formData.is_agreement2) {
      setIsAgreementAll(true);
    } else {
      setIsAgreementAll(false);
    }
  }, [formData.is_agreement1, formData.is_agreement2]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;
    if (name === 'p_num' && value.length <= 13) {
      newValue = formatPhoneNumber(value);
    }
    if (name === 'r_num') {
      newValue = formatRegistrationNumber(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : newValue,
    }));

    validateField(name, newValue);
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
      if (key !== 'confirm_password' && key !== 'verification_code') {
        data.append(key, formData[key]);
      }
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

  const handleAgreementAllChange = (e) => {
    const { checked } = e.target;
    setIsAgreementAll(checked);
    setFormData((prev) => ({
      ...prev,
      is_agreement1: checked,
      is_agreement2: checked,
      is_agreement3: checked,
    }));
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'email':
        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
          error = '유효한 이메일 주소를 입력하세요.';
        }
        break;
      case 'password':
        if (value.length < 8) {
          error = '비밀번호는 최소 8자리 이상이어야 합니다.';
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          error = '특수문자가 하나 이상 포함되어야 합니다.';
        }
        break;
      case 'confirm_password':
        if (value !== formData.password) {
          error = '비밀번호가 일치하지 않습니다.';
        }
        break;
      case 'name':
        if (value.trim() === '') {
          error = '이름을 입력하세요.';
        }
        break;
      case 'p_num':
        if (!/^010-\d{4}-\d{4}$/.test(value)) {
          error = '유효한 전화번호를 입력하세요.';
        }
        break;
      case 'r_num':
        if (!/^\d{3}-\d{2}-\d{5}$/.test(value)) {
          error = '유효한 등록번호를 입력하세요. 예: 000-00-00000';
        }
        break;
      case 'verification_code':
        if (value.trim() === '') {
          error = '인증 코드를 입력하세요.';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const formatPhoneNumber = (value) => {
    value = value.replace(/\D/g, '');
    if (value.length > 10) {
      value = value.replace(/^(\d{3})(\d{4})(\d{4}).*/, '$1-$2-$3');
    } else if (value.length > 6) {
      value = value.replace(/^(\d{3})(\d{4})(\d{0,4}).*/, '$1-$2-$3');
    } else if (value.length > 3) {
      value = value.replace(/^(\d{3})(\d{0,4})/, '$1-$2');
    }
    return value;
  };

  const formatRegistrationNumber = (value) => {
    value = value.replace(/\D/g, '');
    if (value.length > 10) {
      value = value.replace(/^(\d{3})(\d{2})(\d{5}).*/, '$1-$2-$3');
    } else if (value.length > 5) {
      value =value.replace(/^(\d{3})(\d{2})(\d{0,5}).*/, '$1-$2-$3');
    } else if (value.length > 3) {
      value = value.replace(/^(\d{3})(\d{0,2})/, '$1-$2');
    }
    return value;
  };

  const handleSendCode = async () => {
    try {
      await api.post('/api/user/send-code/nonuser/', { email: formData.email });
      setIsCodeSent(true);
      alert('인증 코드가 전송되었습니다.');
    } catch (error) {
      console.error('인증 코드 전송 실패:', error);
      alert('인증 코드 전송 실패');
    }
  };

  const handleVerifyCode = async () => {
    try {
      await api.post('/api/user/verify-code/', { email: formData.email, code: formData.verification_code });
      setIsVerified(true);
      alert('인증 성공');
    } catch (error) {
      console.error('인증 실패:', error);
      alert('인증 실패');
    }
  };

  const isNextDisabled = () => {
    if (step === 0) {
      return !(formData.is_agreement1 && formData.is_agreement2);
    } else if (step === 1) {
      return (
        !formData.email ||
        !formData.password ||
        !formData.confirm_password ||
        !formData.name ||
        !formData.p_num ||
        errors.email ||
        errors.password ||
        errors.confirm_password ||
        errors.name ||
        errors.p_num ||
        !isVerified
      );
    } else if (step === 2) {
      return (
        !formData.store_name ||
        !formData.r_num ||
        !formData.business_r ||
        errors.store_name ||
        errors.r_num
      );
    }
    return false;
  };

  return (
    <ProtectedRoute>
      <Box sx={{ backgroundColor: '#f5f5f5'}}>
        <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '10vh'}}>
          <Link to="/">
            <img src={logo} alt="Pixy Logo" style={{ display: 'block', height: '30px' }} />
          </Link>
        </Box>      
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 320, p: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 1, height: '80vh' }}>
            <Box>
              {(step === 0 || step === 1 || step === 2) && (
                <Typography variant="h4" align="center" gutterBottom>
                  회원가입
                </Typography>
              )}
              {(step === 3) && (
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
                        checked={isAgreementAll}
                        onChange={handleAgreementAllChange}
                        name="is_agreement_all"
                      />
                    }
                    label="모두 동의하기"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.is_agreement1}
                        onChange={handleChange}
                        name="is_agreement1"
                      />
                    }
                    label="[필수] 개인정보수집동의"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.is_agreement2}
                        onChange={handleChange}
                        name="is_agreement2"
                      />
                    }
                    label="[필수] 이용약관동의"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.is_agreement3}
                        onChange={handleChange}
                        name="is_agreement3"
                      />
                    }
                    label="[선택] 마케팅활용동의"
                  />
                </Box>
              )}
              {step === 1 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Email@example.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                  <Button variant="outlined" onClick={handleSendCode} disabled={isCodeSent}>인증 코드 전송</Button>
                  {isCodeSent && (
                    <>
                      <TextField
                        label="인증 코드"
                        name="verification_code"
                        value={formData.verification_code}
                        onChange={handleChange}
                        required
                        error={!!errors.verification_code}
                        helperText={errors.verification_code}
                      />
                      <Button variant="outlined" onClick={handleVerifyCode}>인증 코드 확인</Button>
                    </>
                  )}
                  <TextField
                    label="비밀번호"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                  <TextField
                    label="비밀번호 확인"
                    type="password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    required
                    error={!!errors.confirm_password}
                    helperText={errors.confirm_password}
                    sx={{
                      '& .MuiFormHelperText-root': {
                        color: formData.confirm_password === formData.password ? 'green' : 'red',
                      },
                    }}
                  />
                  <TextField
                    label="이름"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                  <TextField
                    label="휴대폰 번호"
                    name="p_num"
                    value={formData.p_num}
                    onChange={handleChange}
                    required
                    error={!!errors.p_num}
                    helperText={errors.p_num}
                  />
                </Box>
              )}
              {step === 2 && (
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="상호명"
                    name="store_name"
                    value={formData.store_name}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    label="사업자등록번호"
                    name="r_num"
                    value={formData.r_num}
                    onChange={handleChange}
                    required
                    error={!!errors.r_num}
                    helperText={errors.r_num}
                  />
                  <Typography variant="subtitle1">사업자등록증 파일 업로드</Typography>
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
                <Button variant="contained" onClick={handleNext} disabled={isNextDisabled()} sx={{width: '256px'}}>다음</Button>
              )}
              {(step === 1) && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button variant="outlined" onClick={handleBack} sx={{width: '100px'}}>이전</Button>
                  <Button variant="contained" onClick={handleNext} disabled={isNextDisabled()} sx={{width: '100px'}}>다음</Button>
                </Box>
              )}
              {(step === 2) && (
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button variant="outlined" onClick={handleBack} sx={{width: '100px'}}>이전</Button>
                  <Button variant="contained" type="submit" disabled={isNextDisabled()} sx={{width: '100px'}}>회원가입</Button>
                </Box>
              )}
              {(step === 3) && (
                <Button variant="contained" onClick={() => navigate('/login')} sx={{width: '300px'}}>로그인</Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </ProtectedRoute>
  );
};

export default SignUp;
