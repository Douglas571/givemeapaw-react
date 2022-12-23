import { css, keyframes, useTheme } from '@emotion/react'
import { Link } from 'react-router-dom'

import { AuthProvider, useAuth } from '@/hooks/Auth'

import SideBarUserInfo from '@/components/SideBarUserInfo'
import IconButton from '@/components/IconButton'

const MainMenu = (props) => {
  const theme = useTheme()
  const { show, onClose } = props
  const { token, user, onLogout } = useAuth()

  const MobilMenuCSS = css`
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 1000;

    left: -1000vh;

    background-color: ${theme.colors.white};
    padding: 2rem;
    display: flex;
    flex-direction: column;

    li {
      list-style: none;
    }

    &.show {
      left: 0;
    }

    #navbar-close-button {
      display: flex;
      justify-content: end;
    }

    #user-indicator {
      padding-bottom: 1.5rem;
      margin-bottom: 1.5rem;

      display: flex;
      align-items: center;
      gap: 20px;

      border-bottom: 1px solid ${theme.colors.divisor};

      .avatar {
        width: 65px;
        border-radius: 100%;
      }

      .username {
        font-size: 2.5rem;
        font-weight: bold;

        color: ${theme.colors.gray};
      }
    }

    #navbar-menu {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;

      justify-content: space-between;

      height: 100%;
    }

    #navbar-main, 
    #navbar-footer{
      margin: 2rem;

      font-size: 2rem;
      font-weight: bold;
      color: ${theme.colors.gray}
    }

    #navbar-menu {
      ul {
        padding-left: 1rem;
      }

      li {
        margin-bottom: .5rem;
      }
    }

    #navbar-main {

      section {
        margin-bottom: 1.5rem;
      }

      h1 {
        font-size: 1.5rem;
        color: ${theme.colors.divisor};
        margin-bottom: .5rem;
      }
    }

    #navbar-footer {

    }
  `
  const toggleMenu = (evt) => {
    const el = evt.target
    const className = el.getAttribute('class')?.split(' ')
    console.log('close')

    if (className?.includes('menu') || el.localName === 'a') {
      console.log('should close')
      onClose()  
    }
    console.log({className})
    
  }

  const handleLogout = () => {
    console.log('logout')
    onLogout()
  }

  const showClass = show ? ' show' : ''
  return (
    
    <div 
      className={'menu' + showClass} 
      css={MobilMenuCSS}
      onClick={toggleMenu}
    >
      <div id="navbar-close-button">
        <IconButton 
          be="close"
          className='menu'
          onClick={toggleMenu}/>
      </div>
      { token && (
        <Link to="/me"
          onClick={toggleMenu}
        >
          <div id="user-indicator">
            <img src="profile.jpg" className="avatar"/>
            <div className="username">{user.username}</div>
          </div>
        </Link>
      )}
      
      <div id="navbar-menu">
        <div id="navbar-main">
            
          <section>
            { token && (<h1>Navegación</h1>)}
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/campaigns">Campañas</Link></li>
            </ul>
          </section>

          { token && (
              <section>
                <h1>Administración</h1>
                <ul>
                  <li>Donaciones</li>
                  <li>Campañas</li>
                  <li>Métodos de pago</li>
                  <li>Perfil</li>
                </ul>
              </section>
            )
          }

        </div>
        <div id="navbar-footer">
          <ul>
            { token
              ? (
                <>
                  <li>
                    <Link to="/admin/config">Configuración</Link>
                  </li>
                  <li>
                    <Link to="#" onClick={handleLogout}>Cerrar Sesión</Link>
                  </li>
                </>
              )
              : (
                <li><Link to="/login">Iniciar Sesión</Link></li>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MainMenu