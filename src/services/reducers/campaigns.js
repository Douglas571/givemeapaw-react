import { createSlice } from '@reduxjs/toolkit'

import { getCampaigns } from '../../libs/api'

export const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState: {
    value: [],
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload
    },
    add: state => {
      state.value -= 1
    }
  }
})

export default campaignsSlice.reducer