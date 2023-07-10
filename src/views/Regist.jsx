import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/hooks/Auth'

import DeadEndLayout from '@/layout/DeadEndLayout'

import { Box, Paper, Stack, Typography, TextField, Button, Link, Grid, InputAdornment, IconButton} from '@mui/material'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';


const Regist = () => {
  const { onRegist } = useAuth()
  const navigate = useNavigate()

  const [ userData, setUserData ] = useState({

    name: '',
    surname: '',
    email: '',
    password: ''
  })

  const handleChange = (evt) => {
    evt.preventDefault()

    const key = evt.target.name
    const value = evt.target.value
    
    const newUserData = {...userData}
    newUserData[key] = value

    setUserData(newUserData)
  }

  // Password related logic
  const [ showPassword, setShowPassword ] = useState(false)
  const handleClickShwoPassword = () => setShowPassword((show) => !show)

  const [isBadRepeatedPassword, setIsBadRepeatedPassword] = useState(true) 
  
  const handleMouseDownPassword = (evt) => { // ?: should i deleted this code?
    evt.preventDefault()
  }

  const checkPassword = (evt) => {
    const repeatedPassword = evt.target.value 
    if (repeatedPassword != userData.password) {
      console.log('the passwords are different')
      setIsBadRepeatedPassword(true)
    } else {
      console.log('the passwords are equal')
      setIsBadRepeatedPassword(false)
    }
  }

  const handleRegist = async (e) => {
    e.preventDefault()
    console.log('registrando')
    
    const newUser = userData

    console.log({newUser})

    try {
      await onRegist(newUser)
      navigate('/me')
    } catch(err) {

    }
  }

  

  return (
    <DeadEndLayout>

      <Box m={2}>
        <Paper sx={{ p: 3}}>
          
          <Stack spacing={3}>
            <Typography variant='h3' sx={{textAlign: 'center'}}>
              Registro
            </Typography>

            <Grid container>
              <Grid item xs={6}>
                <TextField
                  label='Nombre'
                  name='name'
                  value={userData.name}
                  onChange={handleChange}

                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <AccountCircleIcon/>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={6} sx={{pl:1}}>
                <TextField 
                  label='Apellido'
                  name='surname'
                  value={userData.surname}
                  onChange={handleChange}

                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

            <TextField 
              label='Correo'
              name='email'
              value={userData.email}
              onChange={handleChange}

              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <EmailIcon/>
                  </InputAdornment>
                )
              }}
            />

            <TextField 
              label='Contraseña'
              type={ showPassword ? 'text' : 'password'}
              name='password'
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

            <TextField 
              label='Repetir contraseña'
              type={ showPassword ? 'text' : 'password'}
              name='repeatPassword'
              onBlur={checkPassword}

              error={isBadRepeatedPassword}
              helperText={ isBadRepeatedPassword ? 'La contraseña no coincide' : null}

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
              variant='contained' 
              onClick={handleRegist}
            >Registrarse</Button>
            <Typography sx={{ textAlign: 'center'}}>
              ¿Ya tienes una cuénta? <Link to='/login'>Inicia sesión</Link>
            </Typography>
          </Stack>

        </Paper>
      </Box>
    </DeadEndLayout>
  )
}

export default Regist