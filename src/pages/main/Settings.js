import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../api'; // api.js를 import합니다
import { useUser } from '../../contexts/UserContext'; // UserContext를 import합니다

const Settings = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    p_num: '',
    r_num: '',
    business_r: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // Dialog 상태 추가
  const navigate = useNavigate();
  const { logout } = useUser(); // 로그아웃 함수를 Context에서 가져옵니다

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get('/api/user/profile/normal/');
        setUserInfo(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user info');
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        회원정보 수정
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField
          label="Name"
          name="name"
          value={userInfo.name}
          onChange={handleChange}
          required
          inputProps={{ maxLength: 30, minLength: 1 }}
        />
        <TextField
          label="Phone Number"
          name="p_num"
          value={userInfo.p_num}
          onChange={handleChange}
          required
          inputProps={{ maxLength: 30, minLength: 1 }}
        />
        <TextField
          label="Registration Number"
          name="r_num"
          value={userInfo.r_num}
          onChange={handleChange}
          required
          inputProps={{ maxLength: 30, minLength: 1 }}
        />
        {userInfo.business_r && (
          <Box>
            <Typography variant="subtitle1">사업자등록증:</Typography>
            <a href={userInfo.business_r} target="_blank" rel="noopener noreferrer">사업자등록증 보기</a>
          </Box>
        )}
        <input type="file" onChange={handleFileChange} />
        <Button type="submit" variant="contained" color="primary">
          수정하기
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleOpenDialog}>
          회원탈퇴하기
        </Button>
      </form>
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
    </Box>
  );
};

export default Settings;
