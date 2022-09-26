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

    .msg {
      font-size: 2rem;
      margin: 1rem 0;
    }

    .actions {
      display: flex;
      gap: 1rem;
    }

    .actions .button:last-child {
      flex: 1;
    }
  }
`


const CampaignsView = () => {
  const { token, user } = useAuth()

  const { id } = useParams()
  const navigate = useNavigate()
  const [ campaign, setCampaign ] = useState([])//await getCampains()
  

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

  const coverCSS = css`
    .cover {
      background-image: url(${campaign.img});
      background-size: cover;
      background-position: center;
    }
  `

  const [donationAmount, setDonationAmount] = useState(0)
  const min = 1

  const donationPanelHandleInput = (value) => {
    console.log('new value: ', value)
    setDonationAmount(value)
  }

  const handleDonation = () => {
    if (!donationAmount) return toggleDonationPanel()

    const s = new URLSearchParams()
    s.append('amount', donationAmount)

    const url = `donation?${s.toString()}`
    console.log({url})
    navigate(url)
  }


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
                  <p class="msg">¿Cuánto deseas donar? (min {min}$)</p>
                  <DonationPanelInput
                    max={campaign.goal - campaign.raised}
                    min={min}
                    name="donation-amout"
                    onInput={donationPanelHandleInput}

                    value={donationAmount}
                  />
                  <div class="actions">
                    <Button onClick={handleDonation}>Realizar Donación</Button>
                    <Button onClick={toggleDonationPanel}
                      type="error">Cancelar</Button>
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