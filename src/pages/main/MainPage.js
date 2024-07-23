import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import MainHeader from '../../components/main/MainHeader';
import MainMenuBar from '../../components/main/MainMenuBar';
import MainFooter from '../../components/main/MainFooter';
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
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <MainHeader />
      <Box sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', marginTop: '64px' }}>
        {
          !isSmallScreen &&
          <MainMenuBar />
        }
        <Box sx={{width: '100%'}}>
          <Box component="main" sx={{ flexGrow: 1, p: 3, background: '#f3f5f9' }}>
            {/* <Box component="main" sx={{ flexGrow: 1, p: 3, background: '#f5f5f5'}}> */}
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
            {/* <MainFooter /> */}
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default MainPage;
