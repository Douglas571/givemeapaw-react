import { createSlice } from '@reduxjs/toolkit'

export const donationsSlice = createSlice({
  name: 'donations',
  initialState: {
    value: []
  },
  reducers: {
    update: (state, action) => {
        console.log('donationsSlice: update, payload: ', action.payload)
        state.value = action.payload
    },

    remove: (state, action) => {
        const idToDelete = action.payload
        const newState = state.value.filter( donation => donation.id !== idToDelete)
        state.value = newState
    },

    validate: (state, action) => {
      console.log({action})
      const idToValidate = action.payload
      console.log({idToValidate})
      state.value = state.value.map( donation => {
        if (donation.id == idToValidate) {
          return {...donation, verified: true }
        }

        return donation
      })
    }
  }
})

export default donationsSlice.reducer