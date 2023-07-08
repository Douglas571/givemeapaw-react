import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';

import {Box, Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';

import ProgressBar from '@/components/ProgressBar';

function CampaignItem(props) {
  const { campaign } = props;
  const navigate = useNavigate();

  console.log(campaign)
  console.log(campaign.cover.url)

  return (
    <Card>
      <CardActionArea
        data-test="campaign-action"
        onClick={() => navigate(`${campaign.id}`)}
      >
        <CardMedia
          sx={{ height: 140 }}
          image={ campaign.cover.url || "public/img.jpg"}
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
