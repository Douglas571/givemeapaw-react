import React, { useEffect, useState } from 'react';
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
  Grid,
  Typography } from '@mui/material'

// for search bar
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

import KAppBar from '@/components/KAppBar'
import CampaignItem from '@/components/CampaignItem'

import useCampaigns from '../hooks/useCampaigns';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { update, updateAsync as updateCampaigns } from '@/services/actions/campaigns'


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
  POPULARITY: 'POPULARITY',
  ALPHABETICAL: 'ALPHABETICAL',

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
      <MenuItem value={SORT_BY_STATES.ALPHABETICAL}>Alfabeticamente</MenuItem>
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
  //const [ campaigns, updateCampaigns ] = useCampaigns(); 
  const campaigns = useSelector(state => state.campaigns.value)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('dispaching event')
    dispatch(updateCampaigns())
  }, [])

  /* useState()*/


  const [sortBy, setSortBy] = useState(SORT_BY_STATES.ALPHABETICAL)
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
      
      <Box mt={7} p={2} sx={{background: '#f3f3f3', minHeight: '100vh'}}>
        <Paper sx={{p: 2, mb: 2, maxWidth: '768px', mx: 'auto'}}>

          <Stack gap={1}>
            <SearchBar/>
            <Stack direction={{ sm: 'column', md: 'row' }} gap={1}>
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

        <Grid 
          container 
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          { campaigns.map((c) => (
            
            <Grid item xs={12} md={4} lg={3}>
              <CampaignItem campaign={c} key={c.id} forCard={{ sx:{ minHeight:'350px'} }}/>
            </Grid>

          ))}
        </Grid>

      </Box>

      

    </>
  );
}

export default Campaigns;
