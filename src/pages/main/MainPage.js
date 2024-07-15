import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import MainHeader from '../../components/main/MainHeader';
import MainMenuBar from '../../components/main/MainMenuBar';
import MainFooter from '../../components/main/MainFooter';
import Dashboard from './Dashboard';
import PixyCustom from './PixyCustom';
import Sales from './Sales';
import CCTV from './CCTV';
import Inquiry from './Inquiry';
import Notice from './Notice';
import Settings from './Settings';
import Notifications from './Notifications';

const MainPage = () => {
  return (
    <>
      <MainHeader />
      <MainMenuBar />
      <div className="content">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="pixycustom" element={<PixyCustom />} />
          <Route path="sales" element={<Sales />} />
          <Route path="cctv" element={<CCTV />} />
          <Route path="inquiry" element={<Inquiry />} />
          <Route path="notice" element={<Notice />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="/" element={<Navigate to="dashboard" />} />
        </Routes>
      </div>
      <MainFooter />
    </>
  );
};

export default MainPage;
