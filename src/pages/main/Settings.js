import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import api from '../../api'; // api.js를 import합니다

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
      </form>
    </Box>
  );
};

export default Settings;
