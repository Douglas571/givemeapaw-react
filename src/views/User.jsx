import { useState, useEffect } from 'react'

import { Outlet } from 'react-router-dom'
import { css, useTheme } from '@emotion/react'

import useLocalStorage from '@/hooks/useLocalStorage'
import useCampaigns from '@/hooks/useCampaigns'
import { useAuth } from '@/hooks/Auth'

import { api as API } from '@/libs'

import NavBar from '@/components/NavBar'
import ProgressBar from '../components/ProgressBar'
import Link from '@/components/Link'
import Box from '@/components/Box'
import Title from '@/components/Title'

import DashboardCampaignShorcut from '../components/DashboardCampaignShorcut'


const APP_TITLE = "Danos Una Pata"


const User = () => {
  const { user } = useAuth()
  const theme = useTheme()

  const [ campaigns, updateCampaigns ] = useCampaigns()

  const CSS = css`
    min-height: 100vh;

    font-size: 1.6rem;
    background-color: ${theme.colors.background};

    .info {
      padding: 1rem;
    }

    .justify-center {
      justify-content: center;
    }

    .align-center {
      align-items: center;
    }


    .centered {
      text-align: center;
    }

    .bordered-box {
      margin-top: 1rem;
      padding: 1rem;

      border: 1px solid ${theme.colors.divisor};
      border-radius: 3px;

      .title {
        font-size: 2rem;
      }
    }

    .donation-item {
      display: flex;
      gap: 1rem;

      .avatar {
        width: 50px;
        height: 50px;;
        background-color: ${theme.colors.gray};
        border-radius: 1000%;


      }

      .price {
        
      }
    }

    .link {
      color: ${theme.colors.primary};
      text-decoration: underline;
    }
    

  `
  return (
    <div css={CSS}>
      <NavBar/>
      <div className='p-5'>

        {/* Greeting box */}
        <Box>
          <div className='flex justify-center align-center'>
            <Title>Bienvenido {user.username}</Title>
            <span className='text-7xl'>👋</span>
          </div>
        </Box>

        <Box className="info box">
          <p>En {APP_TITLE} nos aseguramos de que quienes soliciten 
          ayuda sean personas honestas, con intenciones reales
          de ayudar a estos adorables seres que día a día sufren
          en las calles. Si deceas ser parte de esta gran familia te pedimos
          amablemente que hables con nosotros antes de solicitar ayuda.</p>
          <button>Solicitar Rol de Voluntario</button>
        </Box>

        {/* Campaigns Shorcut List */}
        <Box className='box'>
          <div className='mb-5'>
            <Title>Campañas</Title>
          </div>
          <div>
            
            { campaigns.map( c => (
                <DashboardCampaignShorcut campaign={c} /> 
            ))}
          </div>
          <div className='text-center'>
            <Link to='/me/campaigns'>Administrar Campañas</Link>
          </div>
        </Box>

        {/* Donations Shorcut List */}
        <Box>
          <Title>Donaciones Pendientes</Title>
          <div>
            <div className='donation-item bordered-box hover:shadow-lg'>
              <img className='avatar'/>
              <div>
                <h3 className='title'>Juán Gabriel</h3>
                <p>para: Goldens</p>
                <h6 className='text-primary font-bold text-5xl'>100,00$</h6>
              </div>
            </div>
          </div>
          <div className='text-center mt-5'>
            <Link to='/me/donations'>Ver Más</Link>
          </div>
        </Box>

        <Outlet/>
      </div>
    </div>
  )
}

export default User