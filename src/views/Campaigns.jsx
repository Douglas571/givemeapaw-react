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

import AppBar from '@/components/AppBar'
import CampaignItem from '@/components/CampaignItem'

import useCampaigns from '../hooks/useCampaigns';

// for search bar
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

function SearchBar(props) {
  const { search, setSearch } = useState('')
  return (
    <Paper sx={{ mb: 2, p: '4px', px: '20px', display: 'flex' }}>
      <InputBase 
        value={search} 
        sx={{ flex: 1 }} 
        placeholder='Busca campañas'
      />
      <IconButton type='submit' aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
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
    <Select value={props.value} onChange={handleChange}>
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
    <Select value={props.value} onChange={handleChange}>
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
    <div className="campaigns bg-slate-200">
      <AppBar />

      <div className="p-5 h-screen">

        <Box sx={{mb: 2}}>
          <Paper sx={{p: 2}}>
            <h1>Descubrir Campañas</h1>

            <SearchBar/>
            <Box sx={{ display: 'flex', gap: 1, 'flex-wrap': 'nowrap'}}>
              <SorterBy
                value={sortBy}
                handleSortByChange={handleSortByChange}
              />
              <OrderBy
                value={orderBy}
                handleOrderByChange={handleOrderByChange}
              />
            </Box>
          </Paper>


        </Box>

        <Stack spacing={2}>
          { campaigns.map((c) => (
            <CampaignItem campaign={c} key={c.id} />
          ))}
        </Stack>
      </div>
    </div>
  );
}

export default Campaigns;
