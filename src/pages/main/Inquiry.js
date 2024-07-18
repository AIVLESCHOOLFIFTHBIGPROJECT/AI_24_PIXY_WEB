import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    try {
      const response = await axios.get('https://api.pixy.kro.kr/api/post/qna/');
      setQnas(response.data);
    } catch (error) {
      console.error('QnA 목록을 가져오는 중 오류 발생:', error);
    }
  };

  const fetchAnswers = async () => {
    try {
      const response = await axios.get('https://api.pixy.kro.kr/api/post/answer/');
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
    try {
      const response = await axios.post('https://api.pixy.kro.kr/api/post/qna/', newQna);
      setQnas([...qnas, response.data]);
      setNewQna({ title: '', content: '' });
    } catch (error) {
      console.error('QnA를 생성하는 중 오류 발생:', error);
    }
  };

  const handleUpdateQna = async (id) => {
    try {
      const response = await axios.put(`https://api.pixy.kro.kr/api/post/qna/${id}/`, editQna);
      setQnas(qnas.map(qna => (qna.b_num === id ? response.data : qna)));
      setEditQna({ id: null, title: '', content: '' });
    } catch (error) {
      console.error('QnA를 수정하는 중 오류 발생:', error);
    }
  };

  const handleDeleteQna = async (id) => {
    try {
      await axios.delete(`https://api.pixy.kro.kr/api/post/qna/${id}/`);
      setQnas(qnas.filter(qna => qna.b_num !== id));
    } catch (error) {
      console.error('QnA를 삭제하는 중 오류 발생:', error);
    }
  };

  const handleQnaClick = (qna) => {
    setSelectedQna(qna);
  };

  return (
    <div style={{ height: '100vh', padding: '20px', overflow: 'auto' }}>
      <h1>Q&A 게시판</h1>

      <h2>새 QnA 생성</h2>
      <input
        type="text"
        placeholder="제목"
        value={newQna.title}
        onChange={(e) => setNewQna({ ...newQna, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="내용"
        value={newQna.content}
        onChange={(e) => setNewQna({ ...newQna, content: e.target.value })}
      />
      <button onClick={handleCreateQna}>생성</button>

      <h2>QnA 목록</h2>
      <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        {qnas.map(qna => (
          <div key={qna.b_num} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            {editQna.id === qna.b_num ? (
              <>
                <input
                  type="text"
                  value={editQna.title}
                  onChange={(e) => setEditQna({ ...editQna, title: e.target.value })}
                />
                <input
                  type="text"
                  value={editQna.content}
                  onChange={(e) => setEditQna({ ...editQna, content: e.target.value })}
                />
                <button onClick={() => handleUpdateQna(qna.b_num)}>저장</button>
                <button onClick={() => setEditQna({ id: null, title: '', content: '' })}>취소</button>
              </>
            ) : (
              <>
                <h3 onClick={() => handleQnaClick(qna)} style={{ cursor: 'pointer', color: 'blue' }}>
                  {qna.title}
                </h3>
                <p>{qna.content}</p>
                <button onClick={() => setEditQna({ id: qna.b_num, title: qna.title, content: qna.content })}>
                  수정
                </button>
                <button onClick={() => handleDeleteQna(qna.b_num)}>삭제</button>
                {selectedQna && selectedQna.b_num === qna.b_num && (
                  <div>
                    <h4>답변:</h4>
                    <p>{getAnswerForQna(qna.b_num)}</p>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inquiry;
