import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import MainHeader from '../../components/main/MainHeader';
import MainMenuBar from '../../components/main/MainMenuBar';
import Footer from '../../components/Footer';
import Dashboard from './Dashboard';
import PixyCustom from './PixyCustom';
import Sales from './Sales';
import CCTV from './CCTV';
import CCTVFire from './CCTVFire';
import Inquiry from './Inquiry';
import Notice from './Notice';
import Settings from './Settings';
import Notifications from './Notifications';
import Box from '@mui/material/Box';
import PredictSales from './PredictSales';
import { useMediaQuery } from '@mui/material';

const drawerWidth = 240;

const MainPage = () => {
  const isSmallScreen = useMediaQuery('(max-width:1200px)');
  const screen1 = useMediaQuery('(min-width:1200px)');
  const screen2 = useMediaQuery('(max-width:500px)');
  const screen3 = useMediaQuery('(max-width:360px)');
  const headerHeight = 64; // MainHeader의 높이
  const footerHeight = 177.09;
  const footerHeight1 = 197.11;
  const footerHeight2 = 217.13;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <MainHeader />
      <Box sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', flexGrow: 1 }}>
        {!isSmallScreen && <MainMenuBar />}
        <Box sx={{ flexGrow: 1, mt: `${headerHeight}px`, display: 'flex', flexDirection: 'column' }}>
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              p: 3, 
              background: '#f3f5f9', 
              minHeight: screen1?`calc(100vh - ${headerHeight}px - ${footerHeight})`:(screen2?`calc(100vh - ${headerHeight}px - ${footerHeight1})`:`calc(100vh - ${headerHeight}px - ${footerHeight2})`), // Header를 제외한 높이
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="pixycustom" element={<PixyCustom />} />
              <Route path="sales" element={<Sales />} />
              <Route path="predictsales" element={<PredictSales />} />
              <Route path="cctv" element={<CCTV />} />
              <Route path="cctvfire" element={<CCTVFire />} />
              <Route path="inquiry" element={<Inquiry />} />
              <Route path="notice" element={<Notice />} />
              <Route path="settings" element={<Settings />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="/" element={<Navigate to="dashboard" />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default MainPage;
