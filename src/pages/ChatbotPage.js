import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import VoiceVisualization from '../components/VoiceVisualization';

// Web Speech API for speech recognition and synthesis
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'ko-KR';

const Chatbot = () => {
  const [listening, setListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
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
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
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
    <Box sx={{
      position: 'relative',
      overflow: 'hidden',
      height: '100vh',
      backgroundColor: '#333333',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <VoiceVisualization isSpeaking={isSpeaking} />
      <Box sx={{
        position: 'relative',
        zIndex: 1,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: 3,
        justifyContent: 'flex-end',
      }}>
        <Box sx={{
          maxWidth: '800px',
          width: '100%',
          margin: '0 auto',
          marginBottom: '-40px',
          maxHeight: '60vh',
          overflowY: 'auto',
          padding: '20px',
          borderRadius: '15px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
        }}>
          {chatHistory.length === 0 ? (
            <Typography sx={{
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}>
              PIXY와 대화를 시작해 보세요.
            </Typography>
          ) : (
            chatHistory.map((chat, index) => (
              <Box key={index} sx={{
                margin: '15px 0',
                textAlign: chat.type === 'question' ? 'left' : 'right'
              }}>
                <Typography sx={{
                  display: 'inline-block',
                  backgroundColor: chat.type === 'question' ? 'rgba(224, 247, 250, 0.2)' : 'rgba(255, 224, 178, 0.2)',
                  color: 'white',
                  padding: '12px 18px',
                  borderRadius: '20px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  maxWidth: '80%',
                  wordBreak: 'break-word',
                }}>
                  {chat.content}
                </Typography>
              </Box>
            ))
          )}
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          padding: '10px',
        }}>
          <Button
            variant="contained"
            onClick={startListening}
            sx={{
              padding: '15px 30px',
              fontSize: '18px',
              fontWeight: 'bold',
              borderRadius: '30px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
              '&:disabled': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.5)',
              },
            }}
            disabled={listening || loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Start Listening'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chatbot;
