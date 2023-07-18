import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';

import { 
  Box, 
  Paper,
  InputBase,
  Card, 
  CardActionArea, 
  CardContent, 
  CardMedia, 
  Divider, 
  MenuItem, 
  Select, 
  Stack, 
  Typography } from '@mui/material'

import KAppBar from '@/components/KAppBar'
import CampaignItem from '@/components/CampaignItem'

import useCampaigns from '../hooks/useCampaigns';

// for search bar
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

function SearchBar(props) {
  const { search, setSearch } = useState('')
  return (
    <TextField
        value={search} 
        sx={{ flex: 1 }} 
        placeholder='Busca campañas'

        InputProps={{
          endAdornment: (
            <IconButton type='submit' aria-label='search'>
              <SearchIcon />
            </IconButton>
          )
        }}
      />
  )
}

const SORT_BY_STATES = {
  DATE: 'DATE',
  POPULARITY: 'POPULARITY'
}

const ORDER_BY_STATE = {
  ASCENDING: 'ASCENDING',
  DESCENDING: 'DESCENDING'
}

function SorterBy(props) {
  
  function handleChange(evt) {
    props.handleSortByChange(evt.target.value)
  }

  return (
    <Select {...props} value={props.value} onChange={handleChange}>
      <MenuItem value={SORT_BY_STATES.DATE}>Fecha</MenuItem>
      <MenuItem value={SORT_BY_STATES.POPULARITY}>Popularidad</MenuItem>
    </Select>
  )
}

function OrderBy(props) {

  function handleChange(evt) {
    props.handleOrderByChange(evt.target.value)
  }

  return (
    <Select {...props} value={props.value} onChange={handleChange}>
      <MenuItem value={ORDER_BY_STATE.ASCENDING}>Ascendente</MenuItem>
      <MenuItem value={ORDER_BY_STATE.DESCENDING}>Descendente</MenuItem>
    </Select>
  )
}



function Campaigns() {
  const navigate = useNavigate();
  const [ campaigns, updateCampaigns ] = useCampaigns(); /* useState([
    {
      title: 'example1',
      description: 'description example 1',
      goal: 100,
      collected: 0,
      cover: '/img.jpg',
      donations: []
    },
    {
      title: 'example1',
      description: 'description example 1',
      goal: 100,
      collected: 0,
      cover: '/img.jpg',
      donations: []
    },
    {
      title: 'example1',
      description: 'description example 1',
      goal: 100,
      collected: 0,
      cover: '/img.jpg',
      donations: []
    }
  ])*/
  const [sortBy, setSortBy] = useState(SORT_BY_STATES.POPULARITY)
  const [orderBy, setOrderBy] = useState(ORDER_BY_STATE.ASCENDING)


  function handleSortByChange(newState) {
    console.log(`sort by ${newState}`)
    setSortBy(newState)
  }

  function handleOrderByChange(newState) {
    console.log(`sort by ${newState}`)
    setOrderBy(newState)
  }

  return (
    <>
      <KAppBar title='Campañas'/>
      
      <Box mt={7} p={2} sx={{background: '#f3f3f3', height: '100vh'}}>
        <Paper sx={{p: 2}}>

          <Stack gap={1}>
            <SearchBar/>
            <Stack direction='row' gap={1}>
              <SorterBy
                  sx={{flexGrow: 1}}  
                  value={sortBy}
                  handleSortByChange={handleSortByChange}
                />
                <OrderBy
                  sx={{flexGrow: 1}}
                  value={orderBy}
                  handleOrderByChange={handleOrderByChange}
                />
            </Stack>
          </Stack>
        </Paper>


      </Box>

      <Stack spacing={2}>
        { campaigns.map((c) => (
          <CampaignItem campaign={c} key={c.id} />
        ))}
      </Stack>

    </>
  );
}

export default Campaigns;
