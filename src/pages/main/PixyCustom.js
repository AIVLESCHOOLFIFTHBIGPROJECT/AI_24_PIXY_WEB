// PixyCustom.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'ko-KR';

const PixyCustom = () => {
  const [listening, setListening] = useState(false);
  const [response, setResponse] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [learningStatus, setLearningStatus] = useState('');

  useEffect(() => {
    recognition.onstart = () => console.log('Voice recognition started. Speak into the microphone.');
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
    if (listening) recognition.start();
    return () => recognition.stop();
  }, [listening]);

  const getCSRFToken = () => {
    const cookieValue = document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)')?.pop() || '';
    return cookieValue;
  };

  const handleQuestion = async (question) => {
    setChatHistory((prevHistory) => [...prevHistory, { type: 'question', content: question }]);
    try {
      const csrfToken = getCSRFToken();
      const response = await axios.post('http://127.0.0.1:8000/api/llm_model/process_text/', JSON.stringify({ text: question }), {
        headers: { 'X-CSRFToken': csrfToken, 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const answer = response.data ? response.data.response : "No response from server";
      console.log('Answer:', answer);
      setResponse(answer);
      setChatHistory((prevHistory) => [...prevHistory, { type: 'answer', content: answer }]);
      speak(answer);
    } catch (error) {
      console.error('Error sending text to backend:', error);
      setResponse("Error sending text to backend");
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => setListening(true);

  const handleCSVUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadStatus('File uploading...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/llm_model/upload_csv/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadStatus(response.data.message);
    } catch (error) {
      console.error('Error uploading CSV file:', error);
      setUploadStatus('Error uploading CSV file');
    }
  };

  const startLearning = async () => {
    try {
      setLearningStatus('Starting learning process...');
      const response = await axios.post('http://127.0.0.1:8000/api/llm_model/start_learning/', null, {
        headers: { 'Content-Type': 'application/json' },
      });
      setLearningStatus(response.data.message);
    } catch (error) {
      console.error('Error starting learning process:', error);
      setLearningStatus('Error starting learning process');
    }
  };

  return (
    <div style={{ height: '160vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>PIXYCUSTOM</h1>
      <div style={{ maxWidth: '600px', width: '100%', height: '60vh', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9', overflowY: 'scroll' }}>
        {chatHistory.map((chat, index) => (
          <div key={index} style={{ margin: '10px 0', textAlign: chat.type === 'question' ? 'left' : 'right' }}>
            <p style={{ backgroundColor: chat.type === 'question' ? '#e0f7fa' : '#ffe0b2', padding: '10px', borderRadius: '8px', display: 'inline-block', maxWidth: '80%' }}>
              {chat.content}
            </p>
          </div>
        ))}
      </div>
      <button onClick={startListening} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', backgroundColor: listening ? 'blue' : 'initial', color: listening ? 'white' : 'initial' }}>
        Start Listening
      </button>
      <input type="file" accept=".csv" onChange={handleCSVUpload} style={{ marginTop: '20px' }} />
      <p>{uploadStatus}</p>
      <button onClick={startLearning} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
        Start Learning
      </button>
      <p>{learningStatus}</p>
    </div>
  );
};

export default PixyCustom;