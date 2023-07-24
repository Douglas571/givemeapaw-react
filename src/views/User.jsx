import { useState, useEffect } from 'react'

import { Outlet } from 'react-router-dom'
import { css, useTheme } from '@emotion/react'

import useLocalStorage from '@/hooks/useLocalStorage'
import useCampaigns from '@/hooks/useCampaigns'
import { useAuth } from '@/hooks/Auth'

import { api as API } from '@/libs'


import KAppBar from '@/components/KAppBar';
import ProgressBar from '../components/ProgressBar'
import Link from '@/components/Link'
import Title from '@/components/Title'

import DashboardCampaignShorcut from '../components/DashboardCampaignShorcut'
import { Button, Typography, Box, Paper, Stack } from '@mui/material'


const APP_TITLE = "Danos Una Pata"


const User = () => {
  const { user } = useAuth()
  const theme = useTheme()

  const [ campaigns, updateCampaigns ] = useCampaigns()

  return (
    <>
      <KAppBar/>
      <Box sx={{ mt: 7, p: 3, minHeight: '100vh' }}>
        <Stack gap={2}>
          
          {/* Greeting box */}
          <Paper sx={{ p: 2 }}>
            
          <Typography variant='h5' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            Bienvenido {user.username}
            <span className='text-7xl'>👋</span>
          </Typography>
              
            
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant='body1'>En {APP_TITLE} nos aseguramos de que quienes soliciten 
            ayuda sean personas honestas, con intenciones reales
            de ayudar a estos adorables seres que día a día sufren
            en las calles. Si deceas ser parte de esta gran familia te pedimos
            amablemente que hables con nosotros antes de solicitar ayuda.</Typography>
            <Button>Solicitar Rol de Voluntario</Button>
          </Paper>

          {/* Campaigns Shorcut List */}
          <Paper sx={{ p: 2 }}>
            <Typography variant='h5' sx={{ mb: 2}}>Campañas</Typography>
            <Box>
              { campaigns.map( c => (
                  <DashboardCampaignShorcut campaign={c} /> 
              ))}
            </Box>
            <Link to='/me/campaigns'>Administrar Campañas</Link>
          </Paper>

          {/* Donations Shorcut List */}
          {/* <Box>
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
          </Box> */}

        </Stack>
      </Box>
    </>
  )
}

export default User