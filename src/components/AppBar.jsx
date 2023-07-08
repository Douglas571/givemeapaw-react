import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useNavigate } from 'react-router'

import MainMenu from '@/components/MainMenu'

// import MenuIcon from '@mui/icons-material/Menu';
import Icon from '@/components/Icon';

export default function ButtonAppBar() {
  // Variables
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate()

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  function navigateToHome() {
    navigate('/')
  }

  return (
    <>
      <MainMenu show={showMenu} onClose={() => toggleMenu()} />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="blanco">
          <Toolbar>
            <IconButton
              data-test="appbar-menu"
              size="large"
              edge="start"
              color="primary"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => toggleMenu()}
            >
              {/* <MenuIcon /> */}
              <Icon be="menu" />
            </IconButton>
            <Typography variant="h6" color="primary" component="div" sx={{ flexGrow: 1 }}
              onClick={() => navigateToHome()}>
              Give Me A Paw
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}