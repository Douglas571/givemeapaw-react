/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { Alert } from '@mui/material';

import { useNavigate, Link } from 'react-router-dom';

import { useAuth } from '@/hooks/Auth';

// import DeadEndLayout from '@/layout/DeadEndLayout';

import NavBarEndMenu from '@/components/NavBarEndMenu';
import Footer from '@/components/Footer';

import Icon from '@/components/Icon';

import Box from '@/components/Box';
import Title from '@/components/Title';

import Button from '@/components/Button';
import TextField from '@/components/TextField';

function Login() {
  const { onLogin } = useAuth();
  const [badUserOrPassword, setBadUserOrPassword] = useState(false)

  const navigate = useNavigate();

  async function handleLogin(evt) {
    evt.preventDefault();
    // console.log('login');

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
      <div>
        <Box>
          <div>
            <Title>Inicio de Sesión</Title>
          </div>

          <form onSubmit={handleLogin} data-test="login-form">
            <TextField
              name="email"
              placeholder="Correo"
              icon={<Icon be="email" />}
            />

            <TextField
              name="password"
              type="password"
              placeholder="Contraseña"
              icon={<Icon be="key" />}
            />

            { badUserOrPassword && <Alert sx={{ mb: 2}} severity="error">Usuario o contraseña incorrectas</Alert>}

            <div>
              <Button>Iniciar Sesión</Button>
            </div>
          </form>

          <p>
            ¿Has olvidado tu contraseña?
            <Link to="/recover-password"> Recuperar Contraseña</Link>
          </p>
          <p>
            ¿No tienes cuenta?
            <Link to="/regist"> Registrate</Link>
          </p>
        </Box>

      </div>
      <Footer />
    </div>
  );
}

export default Login;
