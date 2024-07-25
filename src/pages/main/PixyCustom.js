import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, CircularProgress } from '@mui/material';

// Web Speech API for speech recognition and synthesis
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'ko-KR';

const PixyCustom = () => {
  const [listening, setListening] = useState(false);
  const [response, setResponse] = useState('');
  const [chatHistory, setChatHistory] = useState([]); // For storing the chat history
  const [uploadedFileName, setUploadedFileName] = useState(''); // For storing the uploaded file name
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(''); // For storing the upload status

  useEffect(() => {
    recognition.onstart = () => {
      console.log('Voice recognition started. Speak into the microphone.');
    };

    recognition.onspeechend = () => {
      console.log('Voice recognition ended.');
      recognition.stop();
      setListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('You said: ', transcript);
      handleQuestion(transcript);
    };

    // Start listening
    if (listening) {
      recognition.start();
    }

    // Cleanup function to stop recognition if component unmounts
    return () => {
      recognition.stop();
    };
  }, [listening]);

  const getCSRFToken = () => {
    const cookieValue = document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)')?.pop() || '';
    return cookieValue;
  };

  const handleQuestion = async (question) => {
    setChatHistory((prevHistory) => [...prevHistory, { type: 'question', content: question }]);
    setLoading(true);

    try {
      const response = await fetch('https://api.pixy.kro.kr/api/custom/ask/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response Data:', data);

      const answer = data.answer;
      console.log('Answer:', answer);
      setResponse(answer);

      setChatHistory((prevHistory) => [...prevHistory, { type: 'answer', content: answer }]);

      speak(answer);
    } catch (error) {
      console.error('Error fetching answer:', error);
    } finally {
      setLoading(false);
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    setListening(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
      setUploadStatus('');
    }
  };

  const handleFileUpload = () => {
    if (uploadedFileName) {
      alert('업로드 완료');
      setUploadedFileName('');
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{
              fontWeight: 'bold',
              fontSize: 'clamp(1rem, 3.5vw, 2rem)',
            }}
          >픽시 커스텀</Typography>
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          background: "#ffffff",
          border: "1px solid #e9ebf2",
          borderRadius: "1.6rem",
          display: "flex",
          flexDirection: "column",
          mb: "1.4rem",
        }}
      >
        <Box sx={{ height: '160vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '10px' }}>
            <Box>
              <Button variant="outlined" component="label">
                파일선택
                <input type="file" accept=".csv" hidden onChange={handleFileChange} />
              </Button>
              <Button variant="outlined" onClick={handleFileUpload} sx={{ ml: 1 }}>
                업로드
              </Button>
              {uploadedFileName && (
                <Typography sx={{ mt: 1 }}>{uploadedFileName}</Typography>
              )}
            </Box>
            <Button
              variant="outlined"
              onClick={startListening}
              sx={{ padding: '10px 20px', fontSize: '16px', minWidth: '150px' }} // Adjusted minWidth to prevent resizing
              disabled={listening || loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Start Listening'}
            </Button>
          </Box>
          <Box sx={{ maxWidth: '600px', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9', mb: '20px' }}>
            {chatHistory.length === 0 ? (
              <Typography sx={{ textAlign: 'center', color: '#999' }}>PIXY와 대화를 시작해 보세요.</Typography>
            ) : (
              chatHistory.map((chat, index) => (
                <Box key={index} sx={{ margin: '10px 0', textAlign: chat.type === 'question' ? 'left' : 'right' }}>
                  <Typography sx={{ backgroundColor: chat.type === 'question' ? '#e0f7fa' : '#ffe0b2', padding: '10px', borderRadius: '8px' }}>
                    {chat.content}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PixyCustom;
