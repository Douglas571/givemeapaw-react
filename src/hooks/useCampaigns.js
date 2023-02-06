// TO-DO: Abstract the campaigns fetch logic here

import { useState, useEffect } from 'react';

import { api as API } from '@/libs';

/**
 * A hook that return the user's campaigns
 * @returns The user's campaigns
 */
const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  async function fetchCampaigns() {
    const newCampaings = await API.getCampaigns();
    // console.log({newCampaings});
    setCampaigns(newCampaings);
  }

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return [campaigns, fetchCampaigns];
};

export default useCampaigns;
