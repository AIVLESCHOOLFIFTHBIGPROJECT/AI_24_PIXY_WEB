import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './styles/theme';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import ProductPage from './pages/ProductPage';
import MainPage from './pages/main/MainPage';
import PixyCustom from './pages/main/PixyCustom';
import Inquiry from './pages/main/Inquiry';
import Chatbot from './pages/ChatbotPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>

      {/* <AuthProvider> */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chatbot" element={<Chatbot />}/>
            <Route path="/product" element={<ProductPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/login" element={<Login />}/>
            {/* <Route path="/main/*" element={<PrivateRoute><MainPage /></PrivateRoute>}/> */}
            <Route path="/main/*" element={<MainPage />}/>
            <Route path="/pixycustom" element={<PixyCustom />}/>
            <Route path="/inquiry" element={<Inquiry />}/>
            {/* 다른 라우트들 */}
          </Routes>
        {/* </AuthProvider> */}
      </Router>
    </ThemeProvider>
  );
}

export default App;