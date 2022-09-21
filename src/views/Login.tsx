import { useState } from 'react'
import { css } from '@emotion/react'

import { useNavigate, Link } from 'react-router-dom'

import { useAuth } from '@/hooks/Auth'

import DeadEndLayout from '@/layout/DeadEndLayout'

import Icon from '@/components/Icon'

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

    @media (min-width: 700px) {
      display: grid;
      grid-template-columns: 1fr 1.5fr;

      & .hero {
        height: 100%;
      }
    }
  `

  return (
      <DeadEndLayout>
        <div css={styles}>
          <div className="hero"></div>
          <div className="container">
            <h1 className="title">Iniciar Seción</h1>

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
                <Button>Entrar</Button>
              </div>
            </form>

            <p>¿Has olvidado tu contraseña? <Link className="link" to="/recover-password">Recuperar Contraseña</Link></p>
            <p>¿No tienes cuenta? <Link className="link" to="/regist">Registrate</Link></p>
            
          </div>
        </div>
      </DeadEndLayout>
    )
}

export default Login