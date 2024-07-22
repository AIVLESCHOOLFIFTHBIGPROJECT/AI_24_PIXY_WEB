import React, { createContext, useState, useContext, useEffect } from 'react';

// UserContext 생성
const UserContext = createContext();

// UserProvider 컴포넌트
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 로그인 시 사용자 정보를 설정하는 함수
  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  // 로그아웃 시 사용자 정보를 초기화하는 함수
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  // // 애플리케이션이 로드될 때 사용자 정보를 로드
  // useEffect(() => {
  //   const storedUser = sessionStorage.getItem('user');
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

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
