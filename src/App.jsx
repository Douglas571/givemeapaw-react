import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useLocation,
  
    Outlet,
    Navigate
} from 'react-router-dom'

import { css } from '@emotion/react'

import { AuthProvider, useAuth } from '@/hooks/Auth'

import Theme from '@/theme.jsx'

import Home from '@/views/Home'
import Login from '@/views/Login'
import Regist from '@/views/Regist'
import User from '@/views/User'

import Campaigns from '@/views/Campaigns'
import CampaignsAdmin from '@/views/CampaignsAdmin'
import CampaignsView from '@/views/CampaignsView'
import Donation from '@/views/Donation'


import { ThemeProvider, useTheme, createTheme, alpha } from '@mui/material/styles';

function App() {
    
    const theTheme = createTheme(Theme);

    const CSS = css`
        background: ${Theme.colors.background};
    `

    return (
        <ThemeProvider theme={theTheme}>
            <AuthProvider>
                <div className='App' css={CSS}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/regist" element={<Regist/>}/>
                            <Route path="/me" element={<ProtectedRoute/>}>
                                <Route index element={<User/>}/>
                                <Route path='/me/campaigns' element={<CampaignsAdmin />}/>
                                <Route path='/me/campaigns/:id' element={<CampaignsView />}/>
                            </Route>

                            <Route path="/campaigns">
                                <Route index element={<Campaigns />} />
                                <Route path=':id' element={<CampaignsView />} />
                                <Route path=':id/donation' element={<Donation />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </div>
            </AuthProvider>
        </ThemeProvider>
        
    )
}

function ProtectedRoute (props) {
    const { token } = useAuth()
  
    if (!token) {
      return <Navigate to="/login" />
    }
  
    console.log('there\' a user with token: ', token)
    return <>{props.children || <Outlet/>}</>
}


export default App