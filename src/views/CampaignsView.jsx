import { useState, useEffect, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import { css } from '@emotion/react'

import {useAuth} from '@/hooks/Auth'
import { api as API } from '@/libs'

import DonationPanelInput from '@/components/DonationPanelInput'
import Button from '@/components/Button'
import ProgressBar from '@/components/ProgressBar'

const CSS = css`
  
  .cover-container {
    padding: 2rem;
  }

  .cover {
    width: 100%;
    aspect-ratio: 16/9;

    border-radius: 5px;
  }

  .content {
    padding: 0 2rem;
  }

  .content .title {
    font-size: 2.5rem;
    line-height: 2.3rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .content .donations {
    margin-bottom: 1rem;

    border-bottom: 2px solid var(--white);
  }

  .donation-panel {
    padding: 1rem 0;
  }
`


const CampaignsView = () => {
  const { token, user } = useAuth()

  const { id } = useParams()
  const navigate = useNavigate()
  const [ campaign, setCampaign ] = useState([])//await getCampains()
  const donationAmount = useRef()

  const [ isDonating, setDonating ] = useState(false)

  const fetchCampaign = async () => {
    const newCampaign = await API.getCampaigns({id})
    console.log({newCampaign})
    setCampaign(newCampaign)
  }

  useEffect(() => {
    fetchCampaign()
  }, [])

  const toggleDonationPanel = () => {
    setDonating(!isDonating)
  }

  const handleDonation = (value) => {
    const amount = Number(value)

    if (!amount) return toggleDonationPanel()

    const s = new URLSearchParams()
    s.append('amount', amount)
    s.append('to', campaign.id)

    const url = `/donation?${s.toString()}`
    console.log({url})
    navigate(url)
  }

  const coverCSS = css`
    .cover {
      background-image: url(${campaign.img});
      background-size: cover;
      background-position: center;
    }
  `

  return (
    <div className="campaign" css={[CSS, coverCSS]}>   

      <div className="cover-container"><div className="cover"></div></div>

      <div className="content">
        <h1 className="title">
          { campaign.title }
        </h1>
        { token && <button>Editar</button> }
        
        <div className="donations">
          <ProgressBar percent={(campaign.goal * campaign.raised) / 100}/>
          <p><span className="u-strong">Recaudado:</span> {campaign.raised}$</p>
          <p><span className="u-strong">Objetivo:</span> {campaign.goal}$</p>

          <div className="donation-panel">
            { isDonating
              ? (<div>
                  <p>¿Cuánto deseas donar?</p>
                  <DonationPanelInput
                    max={campaign.goal - campaign.raised}
                    min={0}
                    name="donation-amout"
                    onValue={}
                  />
                  <div>
                    <button onClick={handleDonation}>Realizar Donación</button>
                    <button onClick={toggleDonationPanel}>Cancelar</button>
                  </div>
                </div>)
              : (<Button onClick={toggleDonationPanel}>Donar</Button>)
            }
          </div>

        
        </div>
        <p>{campaign.description}</p>

      </div>
    </div>
  )
}

export default CampaignsView