import { useState, useEffect, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'


import {useAuth} from '@/hooks/Auth'
import { api as API } from '@/libs'

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

  const handleDonation = (evt) => {
    const amount = Number(donationAmount.current.value)

    if (!amount) return toggleDonationPanel()

    const s = new URLSearchParams()
    s.append('amount', amount)
    s.append('to', campaign.id)

    const url = `/donation?${s.toString()}`
    console.log({url})
    navigate(url)
  }

  return (
    <div className="campaign">
      <h1>
        { campaign.title }
        { token && <button>Editar</button>}
      </h1>
      <img src={campaign.img}/>
      <p>{campaign.description}</p>

      <p>Objetivo: {campaign.goal}</p>
      <p>Recaudado: {campaign.raised}</p>
      
      { isDonating
        ? (<div>
            <p>¿Cuánto deseas donar?</p>
            <input 
              type="number" 
              min="0"
              max={campaign.goal - campaign.raised}
              name="donation-amout" ref={donationAmount}/>
            <div>
              <button onClick={handleDonation}>Realizar Donación</button>
              <button onClick={toggleDonationPanel}>Cancelar</button>
            </div>
          </div>)
        : (<button onClick={toggleDonationPanel}>Donar</button>)
      }
      
    </div>)
}

export default CampaignsView