import React, { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';

import {Box, Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';

import ProgressBar from '@/components/ProgressBar';

function CampaignItem(props) {
  const { campaign, forCard } = props;
  const [coverUrl, setCoverUrl] = useState('')

  const navigate = useNavigate();

  // console.log(campaign)
  // console.log(campaign.cover.url)

  async function downloadBlobImage(url) {
    let res = await fetch(url,
      {
        headers: {
          'ngrok-skip-browser-warning': true,
        }
      })

    let blob = await res.blob()
    console.log({theImageUrlIs: blob});
    
    return blob
  }


  async function downloadCover() {
    let blob = await downloadBlobImage(campaign.cover.url)
    let coverUrl = URL. createObjectURL(blob)
    setCoverUrl(coverUrl)

    // TODO: make it works async
    // return () => {
    //   URL.revokeObjectURL(coverUrl)
    // }
  }

  useEffect(() => {
    downloadCover()
  }, [])

  return (
    <Card
      {...forCard}
    >
      <CardActionArea
        data-test="campaign-action"
        onClick={() => navigate(`${campaign.id}`)}
      >
        <CardMedia
          sx={{ height: '200px' }}
          image={ coverUrl || "public/img.jpg"}
          title="dogs"
        />
        <CardContent>
          <Typography variant="h5">{campaign.title}</Typography>
          <Typography>
            {campaign.description}
          </Typography>

          {/* keep coding the campaigns link card */}

          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ fontWeight: 'bold' }}>
              { campaign.collected }
              $ recaudados
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>

  );
}

export default CampaignItem;
