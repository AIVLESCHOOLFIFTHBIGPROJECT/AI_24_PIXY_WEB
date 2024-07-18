import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Toolbar, Box } from '@mui/material';
import { ReactComponent as DashboardIcon } from '../../assets/icons/dashboard.svg';
import { ReactComponent as PixycustomIcon} from '../../assets/icons/chat.svg';
import { ReactComponent as SalesIcon } from '../../assets/icons/cart.svg';
import { ReactComponent as CctvIcon } from '../../assets/icons/cctv.svg';
import { ReactComponent as InquiryIcon } from '../../assets/icons/help.svg';
import { ReactComponent as NoticeIcon } from '../../assets/icons/award.svg';
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings.svg';
import { ReactComponent as TagIcon } from '../../assets/icons/tag.svg';


const drawerWidth = 240;

const MainMenuBar = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          top: '64px',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* <Toolbar /> */}
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem button component={Link} to="/main/dashboard">
            <ListItemIcon><DashboardIcon style={{ width: '24px', height: '24px' }} /></ListItemIcon>
            <ListItemText primary="대시보드" />
          </ListItem>
          <ListItem button component={Link} to="/main/pixycustom">
            <ListItemIcon><PixycustomIcon style={{ width: '24px', height: '24px' }} /></ListItemIcon>
            <ListItemText primary="픽시커스텀" />
          </ListItem>
          <ListItem button component={Link} to="/main/sales">
            <ListItemIcon><TagIcon style={{ width: '24px', height: '24px' }} /></ListItemIcon>
            <ListItemText primary="판매/재고" />
          </ListItem>
          <ListItem button component={Link} to="/main/predictsales">
            <ListItemIcon><SalesIcon style={{ width: '24px', height: '24px' }} /></ListItemIcon>
            <ListItemText primary="판매/예측" />
          </ListItem>
          <ListItem button component={Link} to="/main/cctv">
            <ListItemIcon><CctvIcon style={{ width: '24px', height: '24px' }} /></ListItemIcon>
            <ListItemText primary="CCTV" />
          </ListItem>
          <ListItem button component={Link} to="/main/inquiry">
            <ListItemIcon><InquiryIcon style={{ width: '24px', height: '24px' }} /></ListItemIcon>
            <ListItemText primary="문의 게시판" />
          </ListItem>
          <ListItem button component={Link} to="/main/notice">
            <ListItemIcon><NoticeIcon style={{ width: '24px', height: '24px' }} /></ListItemIcon>
            <ListItemText primary="공지사항" />
          </ListItem>
          <ListItem button component={Link} to="/main/settings">
            <ListItemIcon><SettingsIcon style={{ width: '24px', height: '24px' }} /></ListItemIcon>
            <ListItemText primary="설정" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default MainMenuBar;
