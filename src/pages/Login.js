import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api'; // api.js를 import합니다
import { useUser } from '../contexts/UserContext'; // UserContext를 import합니다
import logo from '../assets/logo.svg'; // 로고 이미지 경로를 수정하세요

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    reset_password: '',
    confirm_password: '',
    p_num: '',
    verification_code: '',
  });
  const [errors, setErrors] = useState({ email: '', password: '', confirm_password: '', p_num: '', verification_code: '', reset_password: '' });
  const [error, setError] = useState(''); // 에러 메시지 상태 추가
  const [codeSent, setCodeSent] = useState(false); // 인증 코드 전송 여부
  const [codeVerified, setCodeVerified] = useState(false); // 인증 코드 확인 여부
  const [resetPasswordEmail, setResetPasswordEmail] = useState(''); // 비밀번호 재설정 이메일 상태 추가
  const [timer, setTimer] = useState(0);
  const [isResetPasswordDisabled, setIsResetPasswordDisabled] = useState(true); // 비밀번호 재설정 버튼 비활성화 상태 추가
  const navigate = useNavigate();
  const { login } = useUser(); // Context에서 login 함수를 가져옵니다

  const [openFindEmailDialog, setOpenFindEmailDialog] = useState(false);
  const [openResetPasswordDialog, setOpenResetPasswordDialog] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  useEffect(() => {
    if (formData.reset_password && formData.confirm_password && formData.reset_password === formData.confirm_password) {
      setIsResetPasswordDisabled(false);
    } else {
      setIsResetPasswordDisabled(true);
    }
  }, [formData.reset_password, formData.confirm_password]);

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'email':
        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
          error = '유효한 이메일 주소를 입력하세요.';
        }
        break;
      case 'reset_password':
        if (value.length < 8 || value.length > 16) {
          error = '비밀번호는 8~16자리이어야 합니다.';
        } else if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(value)) {
          error = '비밀번호는 영문자, 숫자, 특수문자가 하나 이상 포함되어야 합니다.';
        }
        break;
      case 'confirm_password':
        if (value !== formData.reset_password) {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;
    if (name === 'p_num' && value.length <= 13) {
      newValue = formatPhoneNumber(value);
    }

    validateField(name, newValue);

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : newValue,
    }));
  };

  const formatPhoneNumber = (value) => {
    value = value.replace(/\D/g, '');
    if (value.length === 7) {
      value = value.replace(/^(\d{3})(\d{0,4})/, '$1-$2');
    } else if (value.length > 10) {
      value = value.replace(/^(\d{3})(\d{4})(\d{4}).*/, '$1-$2-$3');
    } else if (value.length > 6) {
      value = value.replace(/^(\d{3})(\d{4})(\d{0,4}).*/, '$1-$2-$3');
    } else if (value.length > 3) {
      value = value.replace(/^(\d{3})(\d{0,4})/, '$1-$2');
    }
    return value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.email || errors.password) {
      alert('입력한 정보를 확인하세요.');
      return;
    }

    const { email, password } = formData;

    try {
      const response = await api.post('/api/user/login/normal/', { email, password });
      const { access_token, refresh, user_id, name } = response.data;
      sessionStorage.setItem('access_token', access_token);

      // 사용자 정보를 Context와 세션 스토리지에 저장
      const userData = { user_id, name };
      login(userData);

      alert('로그인 성공');
      navigate('/main/dashboard', { replace: true }); // 로그인 후 리다이렉트
    } catch (error) {
      alert('로그인 실패: 아이디 또는 비밀번호가 일치하지 않습니다.');
      console.error('로그인 실패:', error.response.data);
      setError(error.response.data.message); // 에러 메시지 설정
    }
  };

  const handleFindEmail = async (e) => {
    e.preventDefault();
    const { name, p_num } = e.target.elements;
    try {
      const response = await api.post('/api/user/find_email/', { name: name.value, p_num: p_num.value });
      console.log(response);
      alert(`이메일: ${response.data}`);
      setOpenFindEmailDialog(false);
    } catch (error) {
      alert('이메일 찾기 실패');
      console.error('이메일 찾기 실패:', error.response.data);
    }
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    const { email } = e.target.elements;
    if (errors.email) {
      alert(errors.email);
      return;
    }

    try {
      await api.post('/api/user/send-code/user/', { email: email.value });
      alert('인증 코드가 전송되었습니다.');
      setResetPasswordEmail(email.value); // 이메일 상태 업데이트
      setCodeSent(true); // 인증 코드 전송 상태 업데이트
      setTimer(300); // 5분 타이머 시작
    } catch (error) {
      alert('인증 코드 전송 실패');
      console.error('인증 코드 전송 실패:', error.response.data);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    const { code } = e.target.elements;
    try {
      const response = await api.post('/api/user/verify-code-login/', { email: resetPasswordEmail, code: code.value });

      if (response && response.data) {
        const { secrets_token } = response.data;
        sessionStorage.setItem('secrets_token', secrets_token);
        alert('인증 성공');
        setCodeVerified(true); // 인증 코드 확인 상태 업데이트
      } else {
        throw new Error('인증 실패');
      }
    } catch (error) {
      alert('인증 실패');
      console.error('인증 실패:', error.response ? error.response.data : error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const { reset_password, confirm_password } = e.target.elements;

    if (reset_password.value !== confirm_password.value) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (errors.reset_password) {
      alert(errors.reset_password);
      return;
    }

    const secrets_token = sessionStorage.getItem('secrets_token');

    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/api/user/reset-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${secrets_token}`,
        },
        body: JSON.stringify({ email: resetPasswordEmail, new_password: reset_password.value }),
      });

      if (!response.ok) {
        throw new Error('비밀번호 재설정 실패');
      }

      alert('비밀번호가 성공적으로 변경되었습니다.');
      setOpenResetPasswordDialog(false);
    } catch (error) {
      alert('비밀번호 재설정 실패');
      console.error('비밀번호 재설정 실패:', error.message);
    }
  };

  return (
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
              {/* {error && (
                <Typography variant="body1" color="error" align="center">
                  {error}
                </Typography>
              )} */}
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button type="submit" variant="contained" sx={{width: '300px'}}>로그인</Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="text" onClick={() => setOpenFindEmailDialog(true)}>이메일 찾기</Button>
            <Button variant="text" onClick={() => setOpenResetPasswordDialog(true)}>비밀번호 재설정</Button>
            <Button variant="text" component={Link} to="/signup">회원가입</Button>
          </Box>
        </Box>
      </Box>

      {/* 이메일 찾기 다이얼로그 */}
      <Dialog open={openFindEmailDialog} onClose={() => setOpenFindEmailDialog(false)}>
        <DialogTitle>이메일 찾기</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleFindEmail} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="이름" name="name" required />
            <TextField 
              label="휴대폰 번호" 
              name="p_num" 
              required
              error={!!errors.p_num}
              helperText={errors.p_num}
              value={formData.p_num}
              onChange={handleChange} />
            <Button type="submit" variant="contained">이메일 찾기</Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFindEmailDialog(false)}>닫기</Button>
        </DialogActions>
      </Dialog>

      {/* 비밀번호 재설정 다이얼로그 */}
      <Dialog open={openResetPasswordDialog} onClose={() => setOpenResetPasswordDialog(false)}>
        <DialogTitle>비밀번호 재설정</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSendCode} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email@example.com"
              name="email"
              required
              error={!!errors.email}
              helperText={errors.email}
              onChange={(e) => {
                const email = e.target.value;
                validateField('email', email);
              }}
              disabled={codeVerified}
            />
            <Button type="submit" variant="contained" disabled={codeVerified}>
              {codeSent ? '인증 코드 재전송' : '인증 코드 전송'}
              </Button>
          </Box>
          {codeSent && (
            <>
              <Box component="form" onSubmit={handleVerifyCode} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <TextField 
                  label={`인증 코드${timer > 0 ? ` (${Math.floor(timer / 60)}:${('0' + (timer % 60)).slice(-2)})` : ''}`} 
                  name="code" 
                  error={!!errors.verification_code}
                  helperText={errors.verification_code}
                  required disabled={timer <= 0 || codeVerified} 
                />
                <Button type="submit" variant="contained" disabled={codeVerified || timer <= 0}>인증 코드 확인</Button>
              </Box>
              {codeVerified && (
                <Box component="form" onSubmit={handleResetPassword} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                  <TextField
                    label="새 비밀번호"
                    name="reset_password"
                    type="password"
                    required
                    error={!!errors.reset_password}
                    helperText={errors.reset_password}
                    onChange={(e) => {
                      const reset_password = e.target.value;
                      validateField('reset_password', reset_password);
                      setFormData((prev) => ({
                        ...prev,
                        reset_password,
                      }));
                    }}
                  />
                  <TextField 
                    label="새 비밀번호 확인" 
                    name="confirm_password" 
                    type="password" 
                    value={formData.confirm_password}
                    onChange={(e) => {
                      handleChange(e);
                      validateField('confirm_password', e.target.value);
                      setFormData((prev) => ({
                        ...prev,
                        confirm_password: e.target.value,
                      }));
                    }}
                    required
                    error={!!errors.confirm_password}
                    helperText={errors.confirm_password}
                    sx={{
                      '& .MuiFormHelperText-root': {
                        color: formData.confirm_password === formData.reset_password ? 'green' : 'red',
                      },
                    }}
                  />
                  <Button type="submit" variant="contained" disabled={isResetPasswordDisabled}>비밀번호 재설정</Button>
                </Box>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenResetPasswordDialog(false)}>닫기</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Login;
