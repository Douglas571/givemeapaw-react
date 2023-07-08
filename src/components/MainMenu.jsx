import React from 'react';
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
  ListItemButton,
  Typography
} from '@mui/material'

import { useNavigate } from 'react-router-dom';

function MainMenu(props) {
  const theme = useTheme()
  const { show, onClose } = props
  const { token, user, onLogout } = useAuth()
  const navigate = useNavigate()

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
            <Typography sx={{ml: 2}}>{user.username}</Typography>
          </Box>
        </Link>
      )}
      
      <Box id="navbar-menu">
        <div id="navbar-main">
          
          <Divider />
          <section>
            <Typography>General</Typography>
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
                <Typography>Administración</Typography>
                <List>
                  {/* <ListItem disablePadding>
                    <ListItemButton>
                      Donaciones
                    </ListItemButton>
                  </ListItem> */}

                  <ListItem disablePadding>
                    <ListItemButton>
                      <Link to="/me/campaigns">Campañas</Link>
                    </ListItemButton>
                  </ListItem>

                  {/* <ListItem disablePadding>
                    <ListItemButton>
                      Métodos de Pago
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton>
                      Perfil
                    </ListItemButton>
                  </ListItem> */}

                </List>
              </section>
            )
          }

        </div>

        <Divider />

        <div id="navbar-footer">
          <List>
            { token
              ? (
                <>
                  {/* <ListItem disablePadding>
                    <ListItemButton>
                      <li>
                        <Link to="/admin/config">Configuración</Link>
                      </li>
                    </ListItemButton>
                  </ListItem> */}
                  
                  <ListItem disablePadding>
                    <ListItemButton>
                        <Link to="#" onClick={handleLogout}>Cerrar Sesión</Link>
                    </ListItemButton>
                  </ListItem>
                </>
              )
              : (
                <>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <Link to="/login">Iniciar Sesión</Link>
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton>
                      <Link to="/regist">Registrate</Link>
                    </ListItemButton>
                  </ListItem>
                  
                </>
              )
            }
          </List>
        </div>
      </Box>
    </Drawer>
  );
}

export default MainMenu;
