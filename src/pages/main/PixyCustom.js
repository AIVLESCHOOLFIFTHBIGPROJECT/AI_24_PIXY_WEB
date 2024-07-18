import React, { useState, useEffect } from 'react';

// Web Speech API for speech recognition and synthesis
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'ko-KR';

const PixyCustom = () => {
  const [listening, setListening] = useState(false);
  const [response, setResponse] = useState('');
  const [chatHistory, setChatHistory] = useState([]); // For storing the chat history

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

  const handleQuestion = async (question) => {
    // Add the question to the chat history
    setChatHistory((prevHistory) => [...prevHistory, { type: 'question', content: question }]);
    
    // Replace with your OpenAI API key from environment variables
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: question }],
      }),
    });

    const data = await response.json();
    const answer = data.choices[0].message.content;
    console.log('Answer:', answer);
    setResponse(answer);
    
    // Add the answer to the chat history
    setChatHistory((prevHistory) => [...prevHistory, { type: 'answer', content: answer }]);
    
    speak(answer);
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    setListening(true);
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
      <button
        onClick={startListening}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: listening ? 'blue' : 'initial',
          color: listening ? 'white' : 'initial'
        }}
      >
        Start Listening
      </button>
    </div>
  );
};

export default PixyCustom;
