import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api'; // api.js를 import합니다
import { useUser } from '../contexts/UserContext'; // UserContext를 import합니다
import logo from '../assets/logo.svg'; // 로고 이미지 경로를 수정하세요

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(''); // 에러 메시지 상태 추가
  const navigate = useNavigate();
  const { login } = useUser(); // Context에서 login 함수를 가져옵니다

  const [openFindEmailDialog, setOpenFindEmailDialog] = useState(false);
  const [openResetPasswordDialog, setOpenResetPasswordDialog] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState(''); // 비밀번호 재설정 이메일 상태 추가
  const [codeSent, setCodeSent] = useState(false); // 인증 코드 전송 여부
  const [codeVerified, setCodeVerified] = useState(false); // 인증 코드 확인 여부

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
    try {
      await api.post('/api/user/send-code/user/', { email: email.value });
      alert('인증 코드가 전송되었습니다.');
      setResetPasswordEmail(email.value); // 이메일 상태 업데이트
      setCodeSent(true); // 인증 코드 전송 상태 업데이트
    } catch (error) {
      alert('인증 코드 전송 실패');
      console.error('인증 코드 전송 실패:', error.response.data);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    const { code } = e.target.elements;
    try {
      const response = await api.post('/api/user/verify-code/', { email: resetPasswordEmail, code: code.value });
      if (response && response.data) {
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
    const { password, confirmPassword } = e.target.elements;
    if (password.value !== confirmPassword.value) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      await api.post('/api/user/reset-password/', { email: resetPasswordEmail, new_password: password.value });
      alert('비밀번호가 성공적으로 변경되었습니다.');
      setOpenResetPasswordDialog(false);
    } catch (error) {
      alert('비밀번호 재설정 실패');
      console.error('비밀번호 재설정 실패:', error.response.data);
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
              {error && (
                <Typography variant="body1" color="error" align="center">
                  {error}
                </Typography>
              )}
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
            <TextField label="휴대폰 번호" name="p_num" required />
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
            <TextField label="이메일" name="email" required />
            <Button type="submit" variant="contained">인증 코드 전송</Button>
          </Box>
          {codeSent && (
            <Box component="form" onSubmit={handleVerifyCode} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField label="인증 코드" name="code" required />
              <Button type="submit" variant="contained">인증 코드 확인</Button>
            </Box>
          )}
          {codeVerified && (
            <Box component="form" onSubmit={handleResetPassword} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField label="새 비밀번호" name="password" type="password" required />
              <TextField label="새 비밀번호 확인" name="confirmPassword" type="password" required />
              <Button type="submit" variant="contained">비밀번호 재설정</Button>
            </Box>
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
