import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import MainHeader from '../../components/main/MainHeader';
import MainMenuBar from '../../components/main/MainMenuBar';
import MainFooter from '../../components/main/MainFooter';
import Dashboard from './Dashboard';
import PixyCustom from './PixyCustom';
import CCTV from './CCTV';
import Notice from './Notice';
import Settings from './Settings';

const MainPage = () => {
  return (
    <div>
      <MainHeader />
      <MainMenuBar />
      <div className="content">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="pixycustom" element={<PixyCustom />} />
          <Route path="cctv" element={<CCTV />} />
          <Route path="notice" element={<Notice />} />
          <Route path="settings" element={<Settings />} />
          <Route path="/" element={<Navigate to="dashboard" />} />
        </Routes>
      </div>
      <MainFooter />
    </div>
  );
};

export default MainPage;
