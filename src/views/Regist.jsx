import { css } from '@emotion/react'

import { useNavigate, Link } from 'react-router-dom'

import { useAuth } from '@/hooks/Auth'

import Box from '@/layout/Box'
import DeadEndLayout from '@/layout/DeadEndLayout'

import Icon from '@/components/Icon'

import Button from '@/components/Button'
import TextField from '@/components/TextField'

const CSS = css`
  .title {
    margin-bottom: 2rem;

    font-size: 3rem;
    font-weight: 700;

    text-align: center;
  }

  .container {
    margin: 2rem;
    background: var(--cultured);
    padding: 2rem;

    box-shadow: 0px 8px 13px 0px rgba(0,0,0,0.35);
    -webkit-box-shadow: 0px 8px 13px 0px rgba(0,0,0,0.35);
    -moz-box-shadow: 0px 8px 13px 0px rgba(0,0,0,0.35);

    border-radius: 3px;
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

  .regist-button-box {
    margin-bottom: 2rem;
  }
`

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
      <div css={CSS}>
        <div className="container">
          <h1 className="title">Registro</h1>
          <form onSubmit={handleSubmit}>

            <TextField
              name='name'
              placeholder="Nombre"
              icon={<Icon be="account_circle"/>}/>

            <TextField
              name='surname'
              placeholder="Apellido"
              icon={<Icon/>}/>

            <TextField
              name='email'
              placeholder="Correo"
              icon={<Icon be="email"/>}/>

            <div>
              <TextField
                name='password'
                placeholder="Contrase??a"
                icon={<Icon be="key"/>}/>              
            </div>

            <div className="regist-button-box"><Button>Registrarce</Button></div>
          </form>
          <p>??Ya tienes una cuenta? <Link className="link" to="/login">Inicia Seci??n</Link></p>
        </div>
      </div>
    </DeadEndLayout>
  )
}

export default Regist