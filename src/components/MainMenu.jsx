import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

import { AuthProvider, useAuth } from '@/hooks/Auth'

const MainMenu = (props) => {
  const { show, onClose } = props
  const { token, onLogout } = useAuth()

  const MobilMenuCSS = css`
    position: fixed;
    top: 0;
    left: -100%;

    width: 100%;
    height: 100%;
    background: red;

    transition: all .2s ease;

    &.show {
      left: 0;
    }
  `

  let menuClass = 'mobil-menu'
  menuClass += show ? ' show' : ''
  console.log({menuClass})

  const toggleMenu = () => {
    onClose()
  }

  return (
    <div className={menuClass} css={MobilMenuCSS}>
      <button onClick={toggleMenu}>X</button>
      <ul onClick={toggleMenu}>
        { token && (
          <li><Link to="/me">Usuario</Link></li>
        )}

        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/me/campains">Campañas</Link></li>

        { token && (
          <li><Link onClick={onLogout}>Cerrar Sesión</Link></li>
        )}

        { !token && (
          <>
            <li><Link to="/login">Iniciar Sesión</Link></li>
            <li><Link to="/regist">Registrarce</Link></li>
          </>
        )}

      </ul>
    </div>
  )
}

export default MainMenu