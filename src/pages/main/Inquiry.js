import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Typography, Paper, TextField, Button, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Inquiry = () => {
  const [qnas, setQnas] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [newQna, setNewQna] = useState({ title: '', content: '' });
  const [editQna, setEditQna] = useState({ id: null, title: '', content: '' });
  const [selectedQna, setSelectedQna] = useState(null);

  useEffect(() => {
    fetchQnas();
    fetchAnswers();
  }, []);

  const fetchQnas = async () => {
    const accessToken = sessionStorage.getItem('access_token');
    try {
      const response = await axios.get('https://api.pixy.kro.kr/api/post/qna/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setQnas(response.data);
    } catch (error) {
      console.error('QnA 목록을 가져오는 중 오류 발생:', error);
    }
  };

  const fetchAnswers = async () => {
    const accessToken = sessionStorage.getItem('access_token');
    try {
      const response = await axios.get('https://api.pixy.kro.kr/api/post/answer/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setAnswers(response.data);
    } catch (error) {
      console.error('답변을 가져오는 중 오류 발생:', error);
    }
  };

  const getAnswerForQna = (qnaId) => {
    const answer = answers.find(answer => answer.b_num === qnaId);
    return answer ? answer.content : '답변이 없습니다.';
  };

  const handleCreateQna = async () => {
    const accessToken = sessionStorage.getItem('access_token');
    try {
      const response = await axios.post('https://api.pixy.kro.kr/api/post/qna/', newQna, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setQnas([...qnas, response.data]);
      setNewQna({ title: '', content: '' });
    } catch (error) {
      console.error('QnA를 생성하는 중 오류 발생:', error);
    }
  };

  const handleUpdateQna = async (id) => {
    const accessToken = sessionStorage.getItem('access_token');
    try {
      const response = await axios.put(`https://api.pixy.kro.kr/api/post/qna/${id}/`, editQna, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setQnas(qnas.map(qna => (qna.b_num === id ? response.data : qna)));
      setEditQna({ id: null, title: '', content: '' });
    } catch (error) {
      console.error('QnA를 수정하는 중 오류 발생:', error);
    }
  };

  const handleDeleteQna = async (id) => {
    const accessToken = sessionStorage.getItem('access_token');
    try {
      await axios.delete(`https://api.pixy.kro.kr/api/post/qna/${id}/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setQnas(qnas.filter(qna => qna.b_num !== id));
    } catch (error) {
      console.error('QnA를 삭제하는 중 오류 발생:', error);
    }
  };

  const handleQnaClick = (qna) => {
    if (selectedQna && selectedQna.b_num === qna.b_num) {
      setSelectedQna(null);
    } else {
      setSelectedQna(qna);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, height: '100vh', overflow: 'auto' }}>
      <Typography variant="h4" gutterBottom>문의 게시판</Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="제목"
          value={newQna.title}
          onChange={(e) => setNewQna({ ...newQna, title: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="내용"
          value={newQna.content}
          onChange={(e) => setNewQna({ ...newQna, content: e.target.value })}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleCreateQna}>등록</Button>
      </Paper>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6">목록</Typography>
        <List>
          {qnas.map(qna => (
            <React.Fragment key={qna.b_num}>
              <ListItem alignItems="flex-start">
                {editQna.id === qna.b_num ? (
                  <>
                    <TextField
                      fullWidth
                      value={editQna.title}
                      onChange={(e) => setEditQna({ ...editQna, title: e.target.value })}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      value={editQna.content}
                      onChange={(e) => setEditQna({ ...editQna, content: e.target.value })}
                      sx={{ mb: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={() => handleUpdateQna(qna.b_num)} sx={{ mb: 2 }}>
                      저장
                    </Button>
                    <Button onClick={() => setEditQna({ id: null, title: '', content: '' })} sx={{ mb: 2 }}>
                      취소
                    </Button>
                  </>
                ) : (
                  <>
                    <ListItemText
                      primary={<Typography variant="h6" onClick={() => handleQnaClick(qna)} sx={{ cursor: 'pointer', color: 'blue' }}>제목: {qna.title}</Typography>}
                      secondary={<Typography variant="body2">내용: {qna.content}</Typography>}
                    />
                    <IconButton edge="end" aria-label="edit" onClick={() => setEditQna({ id: qna.b_num, title: qna.title, content: qna.content })}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteQna(qna.b_num)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </ListItem>
              <Divider variant="inset" component="li" />
              {selectedQna && selectedQna.b_num === qna.b_num && (
                <ListItem>
                  <ListItemText
                    primary={<Typography variant="body2" color="textSecondary">답변: {getAnswerForQna(qna.b_num)}</Typography>}
                  />
                </ListItem>
              )}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Inquiry;
