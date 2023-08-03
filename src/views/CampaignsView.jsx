import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import { useTheme } from '@mui/material/styles'

import { ThemeContext, css } from '@emotion/react'

import {useAuth} from '@/hooks/Auth'
import { api as API } from '@/libs'

import { Paper, Typography, Button, Box, Divider } from '@mui/material';

import DonationPanelInput from '@/components/DonationPanelInput'
import ProgressBar from '@/components/ProgressBar'

import DeadEndMenu from '@/components/DeadEndMenu';

function CampaignsView() {
  const theme = useTheme()
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState({});

  const [isDonating, setDonating] = useState(false);

  const fetchCampaign = async () => {
    const newCampaign = await API.getCampaigns();
    // console.log({newCampaign})

    // console.log({id})
    const theCampaign = newCampaign.find((c) => c.id === Number(id));
    // console.log({theCampaign})
    setCampaign(theCampaign)
  }

  useEffect(() => {
    fetchCampaign()
  }, [])

  const toggleDonationPanel = () => {
    setDonating(!isDonating)
  }


  const [donationAmount, setDonationAmount] = useState(null)
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
    <Box sx={{ background: theme.colors.background, minHeight: '100vh'}}>
      <DeadEndMenu />

      <Paper sx={{ m: 2, pb: .5 }}>
        {(campaign) && (
          <>
            <img
              height="10"
              src={campaign?.cover?.url || undefined}
              alt="lajñfla"
            />

            <Box sx={{ m: 2}}>
              <Box sx={{ m: 1 }}>
                <Typography variant='h6'>
                  {campaign.title}
                </Typography>

                <ProgressBar
                  percent={(campaign.collected / campaign.goal) * 100}
                />
                <Typography display='flex'>
                  <Typography sx={{fontWeight: 'bold'}}>{'Objetivo: '}</Typography>
                  {campaign.goal}
                  $
                </Typography>

                <Typography display='flex'>
                  <Typography sx={{fontWeight: 'bold'}}>{'Recaudado: '}</Typography>
                  {campaign.collected}
                  $
                </Typography>

                <div className="donation-panel">
                  { isDonating
                    ? (
                      <div>
                        <p class="msg">¿Cuánto deseas donar? (min {min}$)</p>
                        <DonationPanelInput
                          max={campaign.goal - campaign.collected}
                          min={min}
                          name="donation-amout"
                          onInput={donationPanelHandleInput}
                          value={donationAmount}
                        />
                        <div class="actions">
                          <Button
                            variant="contained"
                            onClick={handleDonation}>Realizar Donación</Button>
                          <Button onClick={toggleDonationPanel}
                            type="error">Cancelar</Button>
                        </div>
                      </div>
                    )
                    : (
                      <Button
                        variant="contained"
                        onClick={toggleDonationPanel}
                      >
                        Donar
                      </Button>
                    )
                  }
                </div>
              </Box>

              <Divider />

              <Box sx={{ mt: 1 }}>
                <Typography>
                  {campaign.description}
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  )
}

export default CampaignsView