import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// UserContext 생성
const UserContext = createContext();

// UserProvider 컴포넌트
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const logoutTime = 30 * 60 * 1000; // 30분
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  // 로그인 시 사용자 정보를 설정하는 함수
  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.setItem('lastActivity', Date.now());
    setLastActivity(Date.now());
    setIsLogin(true);
  };

  // 로그아웃 시 사용자 정보를 초기화하는 함수
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('lastActivity');
    setIsLogin(false);
    alert("로그아웃 되었습니다");
    navigate('/login');
  };

  // 마지막 활동 시간을 업데이트하는 함수
  const updateLastActivity = useCallback(() => {
    setLastActivity(Date.now());
    sessionStorage.setItem('lastActivity', Date.now());
  }, []);

  // 사용자 활동 감지
  useEffect(() => {
    if(isLogin){
      const handleActivity = () => {
        updateLastActivity();
      };
  
      window.addEventListener('click', handleActivity);
      window.addEventListener('keydown', handleActivity);
      window.addEventListener('mousemove', handleActivity);
  
      return () => {
        window.removeEventListener('click', handleActivity);
        window.removeEventListener('keydown', handleActivity);
        window.removeEventListener('mousemove', handleActivity);
      };
    }
  }, [updateLastActivity, isLogin]);

  // 자동 로그아웃 타이머 설정
  useEffect(() => {
    let interval;
    if (isLogin) {
      interval = setInterval(() => {
        const storedLastActivity = parseInt(sessionStorage.getItem('lastActivity'), 10);
        console.log(storedLastActivity);
        if (Date.now() - storedLastActivity > logoutTime) {
          logout();
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [lastActivity, logoutTime, isLogin]);

  // 애플리케이션이 로드될 때 사용자 정보를 로드
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    const storedLastActivity = parseInt(sessionStorage.getItem('lastActivity'), 10);

    if (storedUser && storedLastActivity) {
      setUser(JSON.parse(storedUser));
      setLastActivity(storedLastActivity);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// UserContext를 사용하는 커스텀 훅
export const useUser = () => {
  return useContext(UserContext);
};
