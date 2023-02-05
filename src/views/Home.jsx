import React, { useState } from 'react';
import { css, useTheme } from '@emotion/react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';

import AppBar from '@/components/AppBar';
// import Button from '@/components/Button'

import Footer from '@/components/Footer';

const CSS = css`
  min-height: 100vh;

  .panel {
    height: 100vh;
  }

  #panel-1 {
    background-image: url('/home1.jpg');
    background-size: cover;
    background-position: center;
  }

  #panel-2 {
    background-color: white;
    background-image: url('/home2.jpg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 0% 65%;
  }
`;

function Home() {
  // const theme = useTheme();

  return (
    <>
      <AppBar />

      <div css={CSS}>
        {/* Panel #1 with the discover campaign advertisement */}
        <div className="panel p-8 pt-[5rem] flex flex-col" id="panel-1">
          <Typography variant="h3" color="primary" gutterBottom>Salvando Animales, Cambiando Vidas</Typography>
          <div className="grow relative">
            <div className="flex justify-center relative top-[60%]">
              <Button variant="contained">
                <Link to="/campaigns">Descubre campañas</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Panel #2 with the sign up shelter or ONG advertisement */}
        <div className="panel p-8 pt-[5rem] flex flex-col" id="panel-2">
          <Typography variant="h3" color="secondary" gutterBottom>Ellos Necesitan de tu Ayuda</Typography>
          <div className="grow relative">
            <div className="flex justify-center relative top-[75%]">
              <Button variant="contained" color="secondary">
                Registra tu refúgio u ONG
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
