import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './styles/theme';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import MainPage from './pages/main/MainPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/main/*" element={<MainPage />}/>
          {/* 다른 라우트들 */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;