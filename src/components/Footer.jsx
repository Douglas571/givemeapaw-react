import { Link } from 'react-router-dom'
import { css } from '@emotion/react'

const CSS = css`
  padding: 3rem;
  text-align: center;

  background: var(--onyx);
  color: var(--cultured);
  
`

const Footer = () => {
  return (
    <div css={CSS}>

      {/* The footer menu */}
      <div className='mb-7'>
        <h1 className='mb-3 text-4xl'>Give Me A Paw</h1>
        <ul className='text-2xl'>
          <li>
            <Link>Inicio</Link>
          </li>
          <li>
            <Link>Campañas</Link>
          </li>
          <li>
            <Link>Refugios y ONGs</Link>
          </li>
          <li>
            <Link>Acerca de Nosotros</Link>
          </li>
          <li>
            <Link>Contáctanos</Link>
          </li>
        </ul>
      </div>


      {/* The CopyRight and legal things*/}
      <div>
        <h1 className=''>Copyright © 2022 Give Me A Paw </h1>
        <p>
          <Link className='text-primary underline'>Terminos y Condiciones</Link>, <Link className='text-primary underline'>Política de Privacidad</Link>
        </p>
      </div>
    </div>
  )
}

export default Footer