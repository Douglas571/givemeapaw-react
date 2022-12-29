import { Link, useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'

import useCampaigns from '@/hooks/useCampaigns'

import NavBar from '@/components/NavBar'
import Box from '@/components/Box'
import CampaignItem from '@/components/CampaignItem'

const CSS = css`

`

const Campaigns = () => {
  const navigate = useNavigate()
  const [ campaigns, updateCampaigns ] = useCampaigns()

  return (
    <div css={CSS} className="campaigns bg-slate-200">
      <NavBar />

      <div className="p-5 h-screen">

        <Box>

          <h1>Descubrir Campañas</h1>
          <input 
            class='border-divisor border-[1px] rounded-[3px]'
            type="text" placeholder='Busqueda'/>

          <h3>Populares</h3>

          <h3>Nuevos</h3>

        </Box>

      </div>
    </div>
  )
}

export default Campaigns