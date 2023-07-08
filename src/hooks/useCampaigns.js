// TO-DO: Abstract the campaigns fetch logic here

import { useState, useEffect } from 'react';

import { api as API } from '@/libs';

/**
 * A hook that return the user's campaigns
 * @returns The user's campaigns
 */

// find this song: What A Feeling
/*
  campaign = {
    title: string
    description: string
    goal: number
    collected: number
    cover: media
    donations: ids donations
  }
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
