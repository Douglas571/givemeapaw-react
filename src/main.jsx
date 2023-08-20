import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

// Tirth party CSS
import 'material-icons/iconfont/material-icons.css'

// Own CSS
import './index.css'

import { Provider, useSelector, useDispatch } from 'react-redux'

// import { increment, decrement } from './feactures/counter'
import store from './services/store'

console.log({the_host_is: import.meta.env.VITE_BACKEND_URL})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>

      <App />
    </Provider>
    
  </React.StrictMode>
)