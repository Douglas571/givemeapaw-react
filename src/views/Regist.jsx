import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/hooks/Auth'

import DeadEndLayout from '@/layout/DeadEndLayout'

import { Box, Paper, Stack, Typography, TextField, Button, Link } from '@mui/material'

const Regist = () => {
  const { onRegist } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('registrando')

    const {name, surname, email, password} = e.target.elements
    
    const newUser = {
      name: name.value, 
      surname: surname.value, 
      email: email.value,
      password: password.value
    }

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
            <TextField
              label='Nombre'
            />

            <TextField 
              label='Apellido'
            />

            <TextField 
              label='Correo'
            />

            <TextField 
              label='Contraseña'
              type='password'
            />

            <TextField 
              label='Repetir contraseña'
              type='password'
            />

            <Button variant='contained'>Registrarce</Button>
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