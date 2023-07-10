/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Alert, 
  Box, 
  Button, 
  FormControl, 
  IconButton, 
  Input, 
  InputAdornment, 
  Paper, 
  Stack, 
  TextField, 
  Typography,
  Link,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


import { useAuth } from '@/hooks/Auth';


import NavBarEndMenu from '@/components/NavBarEndMenu';
import Footer from '@/components/Footer';


function PrimaryLink(props) {
  return (
    <Link to={props.to}>
      <Typography sx={{ color: 'green'}}>
        {props.children}
      </Typography>
    </Link>
  )
}

function Login() {
  
  const [ userData, setUserData ] = useState({
    email: '',
    password: ''
  })

  // Password related logic
  const [ showPassword, setShowPassword ] = useState(false)
  const handleClickShwoPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = () => (evt) => {
    evt.preventDefault()
  }

  const { onLogin } = useAuth();
  const [badUserOrPassword, setBadUserOrPassword] = useState(false)

  
  const navigate = useNavigate();


  // TODO: finish the login functionality, it not comunicate with API yet
  

  const handleChange = (evt) => {
    evt.preventDefault()
    const key = evt.target.name
    const value = evt.target.value

    const newUserData = {...userData}
    newUserData[key] = value
    
    setUserData(newUserData)
  }

  async function handleLogin(evt) {
    evt.preventDefault();

    console.log('before login');
    try {
      await onLogin(userData);
      console.log('pass login');
      navigate('/me');
      
    } catch(err) {
      setBadUserOrPassword(true)
      setTimeout(() => {
        setBadUserOrPassword(false)
      }, 3000)

    }    
  }

  return (
    <div>
      <NavBarEndMenu />
      <Box sx={{ p: "2rem"}}>
        <Paper>
          <Stack 
            spacing={4}
            sx={{ p: "3rem" }}
          >
            
            <Typography 
              sx={{ textAlign: "center"}} 
              variant="h3"
            >
              Inicio de Sesión
            </Typography>

            
            <TextField
              label='Usuario'
              name='email'

              value={userData.email}
              onChange={handleChange}

              // error={!!myForm.errors.companyName}
              // helperText={myForm.errors.companyName}

              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountCircleIcon/>
                  </InputAdornment>
                )
              }}    
            />

            <TextField 
              label='Contraseña'
              name='password'
              type={showPassword ? 'text' : 'password'}
              
              value={userData.password}
              onChange={handleChange}

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


            { badUserOrPassword && <Alert severity='error'>Usuario o contraseña incorreta</Alert> }
            
            {/* the button to login */}
            <Button 
              sx={{ mb:"2rem" }} 
              variant='contained'
              onClick={handleLogin}
            >
              Iniciar Sesión
            </Button>

            {/* the bottom options */}
            <Box>
              <Typography sx={{ textAlign: "center" }}>
                <Link>¿Olvidaste tu contraseña?</Link>
              </Typography>
              <Typography sx={{ textAlign: "center" }}>
                ¿No tienes cuénta? <Link to='/regist'>Registrate</Link>
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Box>
      <Footer />
    </div>
  );
}

export default Login;
