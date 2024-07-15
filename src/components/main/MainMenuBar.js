import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Toolbar } from '@mui/material';

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
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/main/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/main/pixycustom">
          <ListItemText primary="PixyCustom" />
        </ListItem>
        <ListItem button component={Link} to="/main/sales">

          <ListItemText primary="Sales" />
        </ListItem>
        <ListItem button component={Link} to="/main/cctv">
          <ListItemText primary="CCTV" />
        </ListItem>
        <ListItem button component={Link} to="/main/inquiry">
          <ListItemText primary="Inquiry" />
        </ListItem>
        <ListItem button component={Link} to="/main/notice">
          <ListItemText primary="Notice" />
        </ListItem>
        <ListItem button component={Link} to="/main/settings">
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MainMenuBar;
