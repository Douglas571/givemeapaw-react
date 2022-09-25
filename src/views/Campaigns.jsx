import { Link, useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'

import useCampaigns from '@/hooks/useCampaigns'

import CampaignItem from '@/components/CampaignItem'

const CSS = css`
  
  height: 100%;
  padding: 1rem;
  background-color: var(--white);

  & > .title {
    font-size: 4rem;
    margin-bottom: 2rem;
  }

  .campaigns-list {

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, auto));
    gap: 2rem;
  }

  @media (min-width: 750px) {
    & {
      padding: 3rem calc(100vw - 90%);
    }
  }

`

const Campaigns = () => {
  const navigate = useNavigate()
  const [ campaigns, updateCampaigns ] = useCampaigns()

  return (
    <div css={CSS} className={"campaigns"}>
      <h1 className="title">Campañas</h1>
      <div className="campaigns-list">

        { campaigns.map( c => (
            <CampaignItem campaign={c} key={c.id}/>
        ))}    

      </div>
    </div>
  )
}

export default Campaigns