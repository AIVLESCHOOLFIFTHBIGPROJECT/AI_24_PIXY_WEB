import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Web Speech API for speech recognition and synthesis
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'ko-KR';

const PixyCustom = () => {
  const [listening, setListening] = useState(false);
  const [response, setResponse] = useState('');
  const [chatHistory, setChatHistory] = useState([]); // For storing the chat history
  const [uploadedFileName, setUploadedFileName] = useState(''); // For storing the uploaded file name

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
      // 여기에서 파일 업로드 처리를 추가할 수 있습니다.
    }
  };

  return (
    <div style={{ height: '160vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input type="file" onChange={handleFileChange} />
        {uploadedFileName && (
          <p>업로드 파일: {uploadedFileName}</p>
        )}
      </div>
      <button onClick={startListening} style={{ marginBottom: '20px', padding: '10px 20px', fontSize: '16px' }}>
        Start Listening
      </button>
      <div style={{ maxWidth: '600px', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        {chatHistory.map((chat, index) => (
          <div key={index} style={{ margin: '10px 0', textAlign: chat.type === 'question' ? 'left' : 'right' }}>
            <p style={{ backgroundColor: chat.type === 'question' ? '#e0f7fa' : '#ffe0b2', padding: '10px', borderRadius: '8px' }}>
              {chat.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PixyCustom;
