import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Collapse } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const Inquiry = () => {
  const [qnas, setQnas] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [newQna, setNewQna] = useState({ title: '', content: '' });
  const [editQna, setEditQna] = useState({ id: null, title: '', content: '' });
  const [openAnswerId, setOpenAnswerId] = useState(null);

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

  const handleQnaClick = (qnaId) => {
    setOpenAnswerId((prevOpenAnswerId) => (prevOpenAnswerId === qnaId ? null : qnaId));
  };

  const handleEditChange = (field, value) => {
    setEditQna({ ...editQna, [field]: value });
  };

  const handleEditCancel = () => {
    setEditQna({ id: null, title: '', content: '' });
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, background: 'transparent'  }}>
      <Typography variant="h4" gutterBottom sx={{ pb: '1.4rem' }}>문의 게시판</Typography>
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
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <TextField
          label="제목"
          value={newQna.title}
          onChange={(e) => setNewQna({ ...newQna, title: e.target.value })}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="내용"
          value={newQna.content}
          onChange={(e) => setNewQna({ ...newQna, content: e.target.value })}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleCreateQna}>등록</Button>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>제목</TableCell>
              <TableCell>내용</TableCell>
              <TableCell>관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {qnas.map((qna) => (
              <React.Fragment key={qna.b_num}>
                <TableRow>
                  <TableCell>
                    {editQna.id === qna.b_num ? (
                      <TextField
                        value={editQna.title}
                        onChange={(e) => handleEditChange('title', e.target.value)}
                        fullWidth
                      />
                    ) : (
                      <Typography onClick={() => handleQnaClick(qna.b_num)} sx={{ cursor: 'pointer', color: 'blue' }}>
                        {qna.title}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {editQna.id === qna.b_num ? (
                      <TextField
                        value={editQna.content}
                        onChange={(e) => handleEditChange('content', e.target.value)}
                        fullWidth
                      />
                    ) : (
                      qna.content
                    )}
                  </TableCell>
                  <TableCell>
                    {editQna.id === qna.b_num ? (
                      <>
                        <IconButton onClick={() => handleUpdateQna(qna.b_num)}>
                          <SaveIcon />
                        </IconButton>
                        <IconButton onClick={handleEditCancel}>
                          <CancelIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton onClick={() => setEditQna({ id: qna.b_num, title: qna.title, content: qna.content })}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteQna(qna.b_num)}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} sx={{ p: 0 }}>
                    <Collapse in={openAnswerId === qna.b_num} timeout="auto" unmountOnExit>
                      <Box sx={{ m: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          A: {getAnswerForQna(qna.b_num)}
                        </Typography>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    </Box>
  );
};

export default Inquiry;
