import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { useNavigate } from 'react-router'

import MainMenu from '@/components/MainMenu'

export default function KAppBar(props) {
  // Variables

  const { title } = props
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate()

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <>
      <MainMenu show={showMenu} onClose={() => toggleMenu()} />
      
        <AppBar color="white">
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
              <MenuIcon color='primary' />
            </IconButton>
            <Typography variant="h6" color="primary" component="div" sx={{ flexGrow: 1 }}>
              { title ? title : 'Give Me A Paw' }
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
            { props.endAction }
          </Toolbar>
        </AppBar>
    </>
  );
}