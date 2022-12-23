import { useState, useEffect } from 'react'

import { Outlet, Link } from 'react-router-dom'
import { css, useTheme } from '@emotion/react'

import useLocalStorage from '@/hooks/useLocalStorage'
import useCampaigns from '@/hooks/useCampaigns'
import { useAuth } from '@/hooks/Auth'

import { api as API } from '@/libs'

import NavBar from '@/components/NavBar'
import ProgressBar from '../components/ProgressBar'


const APP_TITLE = "Danos Una Pata"

const Box = ({children}) => {
  const theme = useTheme()
  const CSS = css`
    
      padding: 1.5rem 2rem;

      background-color: ${theme.colors.white};
      border-radius: 5px;
      box-shadow:  0px 2px 4px 0px #7F646464;

      h1 {
        font-weight: bold;
        font-size: 3.5rem; 
        line-height: 3.5rem;
        color: ${theme.colors.gray};
      }

      span {
        font-size: 5rem;
      }
    
  `

  return (
    <div css={CSS} 
      className='
        mb-5'
    >{children}</div>)
}

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
        color: ${theme.colors.primary};
        font-weight: bold;
        font-size: 3.5rem;
      }
    }

    .campaign-item {
      
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
        <Box>
          <div className='flex justify-center align-center'>
            <h1>Bienvenido {user.username}</h1>
            <span>👋</span>
          </div>
        </Box>

        <Box>
          <h1>Donaciones Pendientes</h1>
          <div>
            <div className='donation-item bordered-box hover:shadow-lg'>
              <img className='avatar'/>
              <div>
                <h3 className='title'>Juán Gabriel</h3>
                <p>para: Goldens</p>
                <h6 className='price'>100,00$</h6>
              </div>
            </div>
          </div>
          <div className='text-center mt-5'>
            <Link to='/me/donations' className='text-primary underline'>Ver Más</Link>
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

        <Box className='box'>
          <div className='mb-5'>
            <h1>Campañas</h1>
          </div>
          <div>
            { campaigns.map( c => (
                <div className="campaign-item flex gap-4 border-solid border-divisor border-[1px] rounded-md p-5 mb-5
                  hover:shadow-lg">
                  <img className='bg-black w-20 h-20 rounded-full' /> 
                  <div className='grow'>
                    <h3 className="title text-[2rem] leading-[1.5rem]" key={c.id}>{c.title}</h3>
                    <div className='flex justify-between'>
                      <p className='text-4xl font-black text-primary'>{c.raised}$</p>
                      <p className='text-4xl font-black text-divisor'>{c.goal}$</p>
                    </div>

                    <ProgressBar percent={50}/>
                  </div>
                </div>
              ))}
          </div>
          <div className='text-center'>
            <Link to='/me/campaigns' className='text-primary underline'>Administrar Campañas</Link>
          </div>
        </Box>

        <Outlet/>
      </div>
    </div>
  )
}

export default User