import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './reducers/counter'
import campaignsReducer from './reducers/campaigns'

const store = configureStore({
    reducer: {
      counter: counterReducer,
      campaigns: campaignsReducer,
    }
  })

export default store