import React from 'react';
import { Link } from 'react-router-dom';

const MainMenuBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/main/dashboard">Dashboard</Link></li>
        <li><Link to="/main/pixycustom">PixyCustom</Link></li>
        <li><Link to="/main/sales">Sales</Link></li>
        <li><Link to="/main/cctv">CCTV</Link></li>
        <li><Link to="/main/inquiry">Inquiry</Link></li>
        <li><Link to="/main/notice">Notice</Link></li>
        <li><Link to="/main/settings">Settings</Link></li>
      </ul>
    </nav>
  );
};

export default MainMenuBar;