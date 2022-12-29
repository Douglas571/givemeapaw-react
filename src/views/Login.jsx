import { useState } from 'react'
import { css } from '@emotion/react'

import { useNavigate, Link } from 'react-router-dom'

import { useAuth } from '@/hooks/Auth'

import DeadEndLayout from '@/layout/DeadEndLayout'

import NavBarEndMenu from '@/components/NavBarEndMenu'
import Footer from '@/components/Footer'

import Icon from '@/components/Icon'

import Box from '@/components/Box'
import Title from '@/components/Title'

import Button from '@/components/Button'
import TextField from '@/components/TextField'

const Login = () => {
  const {token, onLogin} = useAuth()
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()

  async function handleLogin(evt) {
    evt.preventDefault()
    console.log('login')
      
    const form = evt.target

    const { email, password }  = evt.target.elements
    
    const userData = {
      email: email.value,
      password: password.value
    }

    try {
      await onLogin(userData)
      navigate('/me')
    } catch (err) {
      console.log(err.type)

      if (err.type == 'email') {
        setErrorMsg('El correo no está registrado')
      }

      if (err.type == 'password') {
        setErrorMsg('La contraseña es incorrecta')
      }

    }
    
  }

  const styles = css`
    

    height: 100%;

    font-size: 1.6rem;

    .hero {
      height: 150px;
      background-color: var(--primary-color);
    }

    .container {
      margin: 2rem;
    }


    .title {
      margin-bottom: 2rem;

      font-size: 3rem;
      font-weight: 700;
    }

    form {
      margin-bottom: 2rem;
    }

    .login-button {
      display: flex;
      justify-content: center;
    }

    p {
      color: var(--gray);
      font-size: 1.4rem;
      text-align: center;
    }

    .link {
      color: var(--blue);

      &:active {
        text-decoration: underline;
      }
    }

    .err-msg {
      background-color: hsl(0deg 86% 61%);
      padding: 1rem;
      margin-bottom: 2rem;

      p {
        color: black;
      }
    }
  `

  return (
      <div className='bg-background min-h-screen'>
        <NavBarEndMenu />
        <div css={styles} className='p-5 flex justify-center'>
         
          <Box className="">
            <div className='mb-10 py-[6rem] border-b-[1px] text-center'>
              <Title>Inicio de Sesión</Title>
            </div>

            <form onSubmit={handleLogin}>
              <TextField
                name='email'
                placeholder="Correo"
                icon={<Icon be="email"/>}
              />

              <TextField
                name='password'
                placeholder="Contraseña"
                icon={<Icon be="key"/>}
              />

              { errorMsg && <div className="err-msg"><p>{errorMsg}</p></div> }

              <div className="login-button">
                <Button>Inicias Sesión</Button>
              </div>
            </form>

            <p>¿Has olvidado tu contraseña? <Link className="text-primary underline" to="/recover-password">Recuperar Contraseña</Link></p>
            <p>¿No tienes cuenta? <Link className="text-primary underline" to="/regist">Registrate</Link></p>
            
          </Box>

        </div>
        <Footer />
      </div>
    )
}

export default Login