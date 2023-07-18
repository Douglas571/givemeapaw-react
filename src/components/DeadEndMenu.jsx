import React from 'react';
import { css } from '@emotion/react';
import { useNavigate, Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Icon from '@/components/Icon';

function DeadEndMenu(props) {
  const navigate = useNavigate();
  const { right } = props;

  const goBack = () => {
    setTimeout(() => navigate(-1), 300);
  };

  return (
    <AppBar
      position="static"
      color="white"
    >
      <Toolbar>
        <IconButton
          data-test="appbar-menu"
          size="large"
          edge="start"
          color="primary"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => goBack()}
        >
          {/* <MenuIcon /> */}
          <ArrowBackIcon color='primary'/>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default DeadEndMenu;
