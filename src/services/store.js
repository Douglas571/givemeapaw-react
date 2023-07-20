import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './reducers/counter'
import campaignsReducer from './reducers/campaigns'
import donationsReducer from './reducers/donations'

const store = configureStore({
    reducer: {
      counter: counterReducer,
      campaigns: campaignsReducer,
      donations: donationsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
  })

export default store