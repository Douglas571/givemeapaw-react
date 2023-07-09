/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Alert, Box, Button, IconButton, Input, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


import { useAuth } from '@/hooks/Auth';


import NavBarEndMenu from '@/components/NavBarEndMenu';
import Footer from '@/components/Footer';


function Login() {
  const [ showPassword, setShowPassword ] = useState(false)
  const handleClickShwoPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = () => (evt) => {
    evt.preventDefault()
  }

  const { onLogin } = useAuth();
  const [badUserOrPassword, setBadUserOrPassword] = useState(false)

  
  const navigate = useNavigate();


  // TODO: configure the textfields of email and password to extract the data 
  // when click "iniciar sesión"
  async function handleLogin(evt) {
    evt.preventDefault();
    console.log({name: evt.target.name})

    // const form = evt.target

    const { email, password } = evt.target.elements;

    const userData = {
      email: email.value,
      password: password.value,
    };

    console.log('before login');
    try {
      await onLogin(userData);
      console.log('pass login');
      navigate('/me');
    } catch(err) {
      setBadUserOrPassword(true)

      setTimeout(() => {

        setBadUserOrPassword(false)

      }, 5000)
    }    
  }

  return (
    <div>
      <NavBarEndMenu />
      <Box sx={{ p: "2rem"}}>
        <Paper>
          <Stack sx={{ p: "3rem" }}>
            
            <Typography 
              sx={{ textAlign: "center", mb: "2rem"}} 
              variant="h3"
            >
              Inicio de Sesión
            </Typography>

            <TextField 
              sx={{ mb: "2rem" }} 
              label='Usuario'
              name='email'

              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountCircleIcon/>
                  </InputAdornment>
                )
              }}
            
            />

            <TextField 
              sx={{ mb: "2rem" }} 
              label='Contraseña'
              name='password'
              type={showPassword ? 'text' : 'password'}

              
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <KeyIcon/>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={handleClickShwoPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'>
                      { showPassword ? <VisibilityOff/> : <Visibility/> }
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />


            <Button 
              sx={{ mb:"2rem" }} 
              variant='contained'
              onClick={handleLogin}
            >
              Iniciar Sesión
            </Button>

            <Typography sx={{ textAlign: "center" }}>
              ¿Olvidaste tu contraseña?
            </Typography>
            <Typography sx={{ textAlign: "center" }}>
              ¿No tienes cuénta? Registrate
            </Typography>
          </Stack>
          
          
        </Paper>
      </Box>
      <Footer />
    </div>
  );
}

export default Login;
