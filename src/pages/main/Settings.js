import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import api from '../../api'; // api.js를 import합니다
import { useUser } from '../../contexts/UserContext'; // UserContext를 import합니다
import { useMediaQuery } from '@mui/material';

const Settings = () => {
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const [userInfo, setUserInfo] = useState({
    name: '',
    p_num: '',
    r_num: '',
    business_r: '',
  });
  const [originalUserInfo, setOriginalUserInfo] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    reset_password: '',
    confirm_password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [businessRImageUrl, setBusinessRImageUrl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // Dialog 상태 추가
  const [openResetPasswordDialog, setOpenResetPasswordDialog] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');
  const [resetPasswordStep, setResetPasswordStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPhoneNumberVerified, setIsPhoneNumberVerified] = useState(true);
  const [isPhoneNumberCheckSent, setIsPhoneNumberCheckSent] = useState(true);
  const [isBusinessNumberVerified, setIsBusinessNumberVerified] = useState(true);
  const [isBusinessNumberCheckSent, setIsBusinessNumberCheckSent] = useState(true);
  const [isChanged, setIsChanged] = useState(false);

  const navigate = useNavigate();
  const { logout } = useUser(); // 로그아웃 함수를 Context에서 가져옵니다

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get('/api/user/profile/normal/');
        setUserInfo((prev) => ({
          ...prev,
          ...response.data,
        }));
        setOriginalUserInfo(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user info');
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchBusinessRImage = async () => {
      try {
        const response = await api.get('/api/user/image_get/normal/', { responseType: 'blob' });
        const imageBlob = response.data;
        const imageUrl = URL.createObjectURL(imageBlob);
        setBusinessRImageUrl(imageUrl);
      } catch (err) {
        setError('Failed to fetch business registration image');
      }
    };

    fetchBusinessRImage();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;
    if (name === 'p_num' && value.length <= 13) {
      newValue = formatPhoneNumber(value);
    }
    if (name === 'r_num') {
      newValue = formatRegistrationNumber(value);
    }
    setUserInfo((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : newValue,
    }));

    validateField(name, newValue);

    if (name === 'p_num' && newValue !== originalUserInfo.p_num) {
      setIsPhoneNumberCheckSent(false);
      setIsPhoneNumberVerified(false);
    } else if (name === 'p_num' && newValue === originalUserInfo.p_num) {
      setIsPhoneNumberCheckSent(true);
      setIsPhoneNumberVerified(true);
    }

    if (name === 'r_num' && newValue !== originalUserInfo.r_num) {
      setIsBusinessNumberCheckSent(false);
      setIsBusinessNumberVerified(false);
    } else if (name === 'r_num' && newValue === originalUserInfo.r_num) {
      setIsBusinessNumberCheckSent(true);
      setIsBusinessNumberVerified(true);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsChanged(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', userInfo.name);
    data.append('p_num', userInfo.p_num);
    data.append('r_num', userInfo.r_num);
    if (selectedFile) {
      data.append('business_r', selectedFile);
    }
    console.log(data);
    try {
      await api.put('/api/user/profile/normal/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('User info updated successfully');
    } catch (err) {
      setError('Failed to update user info');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await api.post('/api/user/delete_user/normal/');
      alert('회원탈퇴가 완료되었습니다.');
      logout(); // 사용자 로그아웃 처리
      sessionStorage.removeItem('access_token'); // 토큰 제거
      navigate('/', { replace: true }); // 초기 화면으로 리다이렉션
    } catch (err) {
      setError('Failed to delete account');
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenResetPasswordDialog = () => {
    setOpenResetPasswordDialog(true);
  };

  const handleCloseResetPasswordDialog = () => {
    setOpenResetPasswordDialog(false);
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/user/send-code/user/', { email: resetPasswordEmail });
      setIsCodeSent(true);
      alert('인증 코드가 전송되었습니다.');
      setResetPasswordStep(2);
      setTimer(300); // 5분 타이머 시작
    } catch (error) {
      alert('인증 코드 전송 실패');
      console.error('인증 코드 전송 실패:', error.response.data);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/user/verify-code-settings/', { email: resetPasswordEmail, code: verificationCode });
      if (response && response.data) {
        setCodeVerified(true);
        setResetPasswordStep(3);
        alert('인증 성공');
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
    const { reset_password, confirm_password } = formData;

    if (reset_password !== confirm_password) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (errors.reset_password) {
      alert(errors.reset_password);
      return;
    }

    try {
      await api.post('/api/user/reset-password/', { email: resetPasswordEmail, new_password: reset_password });
      alert('비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요');
      setOpenResetPasswordDialog(false);
      logout(); // 사용자 로그아웃 처리
      sessionStorage.removeItem('access_token'); // 토큰 제거
      navigate('/login', { replace: true }); // 초기 화면으로 리다이렉션
    } catch (error) {
      alert('비밀번호 재설정 실패');
      console.error('비밀번호 재설정 실패:', error.response.data);
    }
  };

  const validateField = (name, value) => {
    let error = '';
    setIsChanged(true);
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
        setIsPhoneNumberCheckSent(false); // 전화번호가 변경되면 중복확인 상태를 초기화
        break;
      case 'r_num':
        if (!/^\d{3}-\d{2}-\d{5}$/.test(value)) {
          error = '유효한 등록번호를 입력하세요. 예: 000-00-00000';
        }
        setIsBusinessNumberCheckSent(false)
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

  const checkPhoneNumber = async () => {
    try {
      await api.post('/api/user/duplicate_phonenumber/normal/', { p_num: userInfo.p_num });
      setIsPhoneNumberVerified(true);
      setIsPhoneNumberCheckSent(true); // 중복확인 버튼이 눌려졌음을 표시
      alert('전화번호 확인 완료');
    } catch (error) {
      console.error('전화번호 중복 확인 실패:', error);
      setIsPhoneNumberVerified(false);
      setIsPhoneNumberCheckSent(false);
      alert('전화번호가 중복되었습니다.');
    }
  };

  const checkBusinessNumber = async () => {
    try {
      const response = await api.post('/api/user/check-business/', { b_no: [userInfo.r_num.replace(/-/g, '')] });
      const { data } = response.data;
      if (data[0].tax_type === "국세청에 등록되지 않은 사업자등록번호입니다.") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          r_num: '국세청에 등록되지 않은 사업자등록번호입니다.',
        }));
        setIsBusinessNumberVerified(false);
        setIsBusinessNumberCheckSent(false);
        alert('국세청에 등록되지 않은 사업자등록번호입니다.');
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          r_num: '',
        }));
        setIsBusinessNumberVerified(true);
        setIsBusinessNumberCheckSent(true);
        alert('사업자등록번호 확인 완료');
      }
    } catch (error) {
      console.error('사업자등록번호 확인 실패:', error);
      setIsBusinessNumberVerified(false);
      setIsBusinessNumberCheckSent(false);
      alert('사업자등록번호 확인 실패');
    }
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

  const formatRegistrationNumber = (value) => {
    value = value.replace(/\D/g, '');
    if (value.length === 6) {
      value = value.replace(/^(\d{3})(\d{0,2})/, '$1-$2');
    } else if (value.length > 10) {
      value = value.replace(/^(\d{3})(\d{2})(\d{5}).*/, '$1-$2-$3');
    } else if (value.length > 5) {
      value = value.replace(/^(\d{3})(\d{2})(\d{0,5}).*/, '$1-$2-$3');
    } else if (value.length > 3) {
      value = value.replace(/^(\d{3})(\d{0,2})/, '$1-$2');
    }
    return value;
  };

  const isFormValid = userInfo.name.trim() !== '' &&
    isChanged &&
    ((originalUserInfo.p_num !== userInfo.p_num) || (originalUserInfo.r_num !== userInfo.r_num ||
      (originalUserInfo.name !== userInfo.name) || (selectedFile !== null)
    )) &&
    /^010-\d{4}-\d{4}$/.test(userInfo.p_num) &&
    isPhoneNumberVerified &&
    /^\d{3}-\d{2}-\d{5}$/.test(userInfo.r_num) &&
    isBusinessNumberVerified //&&
  //selectedFile !== null;

  const isResetPasswordDisabled = !formData.reset_password ||
    !formData.confirm_password ||
    formData.reset_password !== formData.confirm_password ||
    !!errors.reset_password ||
    !!errors.confirm_password;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const images = [
    {
      original: businessRImageUrl,
      thumbnail: businessRImageUrl,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3, background: 'transparent' }}>
      <Typography variant="h4" gutterBottom sx={{ pb: '1.4rem' }}>
        회원정보 수정
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          p: '4rem',
          background: '#ffffff',
          border: '1px solid #e9ebf2',
          borderRadius: '1.6rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          <Box sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', gap: '3rem' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '300px' }}>
              <Typography variant="subtitle1">기본 정보</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '300px' }}>
                <TextField
                  label="이름"
                  name="name"
                  value={userInfo.name}
                  onChange={handleChange}
                  required
                  inputProps={{ maxLength: 30, minLength: 1 }}
                />
                <TextField
                  label="휴대폰 번호"
                  name="p_num"
                  value={userInfo.p_num}
                  error={!!errors.p_num}
                  helperText={errors.p_num}
                  onChange={(e) => {
                    handleChange(e);
                    validateField('p_num', e.target.value);
                  }}
                  required
                  inputProps={{ maxLength: 30, minLength: 1 }}
                />
                <Button variant="outlined" onClick={checkPhoneNumber} disabled={isPhoneNumberCheckSent || userInfo.p_num === originalUserInfo.p_num}>
                  중복 확인
                </Button>
                <TextField
                  label="사업자등록번호"
                  name="r_num"
                  value={userInfo.r_num}
                  error={!!errors.r_num}
                  helperText={errors.r_num}
                  onChange={(e) => {
                    handleChange(e);
                    validateField('r_num', e.target.value);
                  }}
                  required
                  inputProps={{ maxLength: 30, minLength: 1 }}
                />
                <Button variant="outlined" onClick={checkBusinessNumber} disabled={isBusinessNumberCheckSent || userInfo.r_num === originalUserInfo.r_num}>
                  사업자등록번호 확인
                </Button>
              </Box>
            </Box>
            {businessRImageUrl && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Typography variant="subtitle1">사업자등록증</Typography>
                <input type="file" onChange={handleFileChange} />
                <Box sx={{ maxWidth: 300, maxHeight: 600 }}>
                  <ImageGallery items={images} showThumbnails={false} showPlayButton={false} />
                </Box>
              </Box>
            )}
          </Box>
          <Button type="submit" variant="contained" color="primary" disabled={!isFormValid}>
            수정하기
          </Button>
          <Button variant="outlined" color="primary" onClick={handleOpenResetPasswordDialog}>
            비밀번호 재설정
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleOpenDialog}>
            회원탈퇴하기
          </Button>
        </form>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>회원탈퇴</DialogTitle>
        <DialogContent>
          <DialogContentText>
            정말 회원탈퇴하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            취소
          </Button>
          <Button onClick={handleDeleteAccount} color="secondary">
            탈퇴
          </Button>
        </DialogActions>
      </Dialog>

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
                setResetPasswordEmail(email);
              }}
              disabled={codeVerified}
            />
            <Button type="submit" variant="contained" disabled={codeVerified}>
              {isCodeSent ? '인증 코드 재전송' : '인증 코드 전송'}
            </Button>
          </Box>
          {isCodeSent && (
            <>
              <Box component="form" onSubmit={handleVerifyCode} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <TextField
                  label={`인증 코드${timer > 0 ? ` (${Math.floor(timer / 60)}:${('0' + (timer % 60)).slice(-2)})` : ''}`}
                  name="code"
                  error={!!errors.verification_code}
                  helperText={errors.verification_code}
                  required disabled={timer <= 0 || codeVerified}
                  onChange={(e) => setVerificationCode(e.target.value)}
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

export default Settings;
