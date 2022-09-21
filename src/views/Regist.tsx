import { css } from '@emotion/react'

import { useNavigate, Link } from 'react-router-dom'

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
  }

  .container {
    margin: 2rem;
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
  return (
    <DeadEndLayout>
      <div css={CSS}>
        <div className="container">
          <h1 className="title">Registro</h1>
          <form>

            <TextField
              placeholder="Nombre"
              icon={<Icon be="account_circle"/>}/>

            <TextField
              placeholder="Apellido"
              icon={<Icon/>}/>

            <TextField
              placeholder="Correo"
              icon={<Icon be="email"/>}/>

            <div>
              <TextField
                placeholder="Contraseña"
                icon={<Icon be="key"/>}/>              
            </div>

            <div className="regist-button-box"><Button>Registrarce</Button></div>
          </form>
          <p>¿Ya tienes una cuenta? <Link className="link" to="/login">Inicia Seción</Link></p>
        </div>
      </div>
    </DeadEndLayout>
  )
}

export default Regist