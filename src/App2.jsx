/*

  tutorials of react router
    https://www.robinwieruch.de/react-router-nested-routes/
*/

import { useState } from 'react'
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

// hooks
import { AuthProvider, useAuth } from '@/hooks/Auth'

// Components
import MainMenu from '@/components/MainMenu'

// Views
import NoMatch from '@/views/NoMatch'

import Home from '@/views/Home'
import Login from '@/views/Login'
import Regist from '@/views/Regist'
import RecoverPassword from '@/views/RecoverPassword'

import Donation from '@/views/Donation'
import Campaigns from '@/views/Campaigns'
import CampaignsView from '@/views/CampaignsView'

import User from '@/views/User'

import Footer from '@/components/Footer'
//import UserCampains from '@/views/UserCampains'


function App() {

  const styles = css`


    overflow: scroll;
    font-size: 1.6rem;

    .nav-menu {
      display: flex;
      gap: 1rem;

      padding: 1rem;
    }

    .nav-menu .title {
      font-size: 2rem;
    }
  `



  return (
    <AuthProvider>
      <div className="App" css={styles}>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<MainRoute/>}>
              <Route path="me" element={<ProtectedRoute/>}>
                <Route index element={<User/>}/>
                <Route path="*" element={<NoMatch/>}/>
              </Route>

              <Route path="campaigns" element={<Campaigns/>}/>
              <Route path="campaigns/:id" element={<CampaignsView/>}/>
              <Route path="campaigns/:id/donation" element={<Donation/>}/>

              <Route path="*" element={<NoMatch/>}/>

            </Route>

            <Route path="/login" element={<Login/>}/>
            <Route path="/regist" element={<Regist/>}/>
            <Route path="/recover-password" element={<RecoverPassword/>}/>
         
          </Routes>


        </BrowserRouter>
      </div>
    </AuthProvider>
  )
}

function MainRoute() {
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <>
      <div className="nav-menu">
        <button onClick={toggleMenu}>Menu</button>
        <h1 className="title">Dame Una Pata</h1>
      </div>
      

      <MainMenu show={showMenu} onClose={toggleMenu}/>

      <Outlet/>

      <Footer/>
    </>

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
