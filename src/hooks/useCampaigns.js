//TO-DO: Abstract the campaigns fetch logic here.

import { useState, useEffect } from 'react'

import { api as API } from '@/libs'

const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState([])
  
  async function fetchCampaigns() {
    const newCampaings = await API.getCampaigns()
    setCampaigns(newCampaings)
  }

  useEffect(() => {

    fetchCampaigns()

  }, [])

  return [campaigns, fetchCampaigns]
}

export default useCampaigns