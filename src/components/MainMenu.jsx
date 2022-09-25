import { css, keyframes } from '@emotion/react'
import { Link } from 'react-router-dom'

import { AuthProvider, useAuth } from '@/hooks/Auth'

import SideBarUserInfo from '@/components/SideBarUserInfo'

const MainMenu = (props) => {
  const { show, onClose } = props
  const { token, onLogout } = useAuth()

  const apearKf = keyframes`
    
  `

  const MobilMenuCSS = css`
    position: fixed;
    top: 0;
    left: -100%;

    width: 100%;
    height: 100%;
    background-color: hsl(0, 0%, 0%, 0);

    font-size: 2rem;

    transition: all .2s ease;

    &.show {
      left: 0;
      background-color: hsl(0, 0%, 0%, .8);
    }

    .background {

      width: 100%;
      height: 100vh;
      opacity: 0;
      background: black;

    }


    .menu-surface {
      width: 88%;
      height: 100vh;
      background: white;
    }

    .option-list {
      padding-top: 2rem;
    }

    li {
      padding: 1rem 2rem;
    }
  `
  const toggleMenu = (evt) => {
    const el = evt.target
    const className = el.getAttribute('class')?.split(' ')

    if (className?.includes('menu') || el.localName === 'a') {
      onClose()  
    }
    console.log({className})
    
  }


  /* I don't know if add a close button...
   * <button onClick={toggleMenu} class>X</button>
   *
   * TO-DO: Make a better animation, background fadeIn and
   *        menu-surface move right.
   */

  const showClass = show ? ' show' : ''
  return (
    
    <div className={'menu' + showClass} 
      css={MobilMenuCSS}
      onClick={toggleMenu}>

      <div className="menu-surface">
        { token && <SideBarUserInfo/> }
        <ul className="option-list">

          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/campaigns">Campañas</Link></li>

          { token && <li><Link onClick={onLogout}>Cerrar Sesión</Link></li> }

          { !token && (
            <>
              <li><Link to="/login">Iniciar Sesión</Link></li>
              <li><Link to="/regist">Registrarce</Link></li>
            </>
          )}

        </ul>
      </div>

    </div>
  )
}

export default MainMenu