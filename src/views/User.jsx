import { useState, useEffect } from 'react'

import { Outlet, Link } from 'react-router-dom'
import { css } from '@emotion/react'

import useLocalStorage from '@/hooks/useLocalStorage'
import useCampaigns from '@/hooks/useCampaigns'

import { api as API } from '@/libs'

const APP_TITLE = "Danos Una Pata"

const CSS = css`
  font-size: 1.6rem;

  .info {
    background-color: gray;
    padding: 1rem;
  }

`

const User = () => {
  const user = {
    name: 'douglas571'
  }

  const [ campaigns, updateCampaigns ] = useCampaigns()

  return (
    <div css={CSS}>
      <h1>Bienvenido {user.name}</h1>

      <div className="info">
        <p>En {APP_TITLE} nos aseguramos de que quienes soliciten 
        ayuda sean personas honestas, con intenciones reales
        de ayudar a estos adorables seres que día a día sufren
        en las calles. Si deceas ser parte de esta gran familia te pedimos
        amablemente que hables con nosotros antes de solicitar ayuda.</p>
        <button>Solicitar Rol de Voluntario</button>
      </div>

      <div>
        <div>
          <h2>Campañas</h2>
          <button>Nueva Campaña</button>
        </div>
        <div>
          { campaigns.map( c => (
              <div className="campaign">
                <h1 key={c.id}>{c.title}</h1>
                <p>Objetivo: {c.goal}</p>
                <p>Recaudado: {c.raised}</p>
                <Link to={'/campaigns/' + c.id }>Ver más...</Link>
              </div>
            ))}
        </div>
      </div>

      <Outlet/>
    </div>

  )
}

export default User