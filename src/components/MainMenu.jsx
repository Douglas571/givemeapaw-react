import { css, keyframes, useTheme } from '@emotion/react'
import { Link } from 'react-router-dom'

import { AuthProvider, useAuth } from '@/hooks/Auth'

import SideBarUserInfo from '@/components/SideBarUserInfo'
import IconButton from '@/components/IconButton'
import { 
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton
} from '@mui/material'

function MainMenu(props) {
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
    
    <Drawer 
      className={'menu' + showClass}
      // css={MobilMenuCSS}
      open={show}
      onClose={onClose}
    >
      { token && (
        <Link to="/me"
          onClick={toggleMenu}
        >
          <Box 
            id="user-indicator"
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              margin: '1rem'
            }}
          >
            <Avatar alt="Remy Sharp" src="profile.jpg" />
            <div className="username">{user.username}</div>
          </Box>
        </Link>
      )}
      
      <Box id="navbar-menu">
        <div id="navbar-main">

          <Divider />
          <section>

            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <Link to="/">Inicio</Link>
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                <Link to="/campaigns">Campañas</Link>
                </ListItemButton>
              </ListItem>

            </List>
          </section>

          <Divider />

          { token && (
              <section>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      Donaciones
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton>
                      Campañas
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton>
                      Métodos de Pago
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton>
                      Perfil
                    </ListItemButton>
                  </ListItem>

                </List>
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
      </Box>
    </Drawer>
  );
}

export default MainMenu;