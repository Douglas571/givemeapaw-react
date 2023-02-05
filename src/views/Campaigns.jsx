import React from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';

import AppBar from '@/components/AppBar'
import CampaignItem from '@/components/CampaignItem'
import { Box, Card, CardActionArea, CardContent, CardMedia, Divider, Stack, Typography } from '@mui/material'

import useCampaigns from '../hooks/useCampaigns';

const CSS = css`

`

function Campaigns() {
  const navigate = useNavigate();
  const [ campaigns, updateCampaigns ] = useCampaigns();
  console.log({campaigns})

  return (
    <div css={CSS} className="campaigns bg-slate-200">
      <AppBar />

      <div className="p-5 h-screen">

        <Box>

          <h1>Descubrir Campañas</h1>
          <input
            className="border-divisor border-[1px] rounded-[3px]"
            type="text"
            placeholder="Busqueda"
          />

          <h3>Populares</h3>

          <h3>Nuevos</h3>

        </Box>

        <Stack spacing={2}>
          { campaigns.map((c) => (
            <Card>
              <CardActionArea>
                <CardMedia
                  sx={{ height: 140 }}
                  image="public/img.jpg"
                  title="dogs"
                />
                <CardContent>
                  <Typography variant="h5">{c.title}</Typography>
                  <Typography>
                    {c.description}
                  </Typography>

                  {/* keep coding the campaigns link card */}

                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ fontWeight: 'bold' }}>
                      { c.collected }
                      $ recaudados
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </div>
    </div>
  );
}

export default Campaigns;
