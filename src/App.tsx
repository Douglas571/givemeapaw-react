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

import User from '@/views/User'
import UserCampains from '@/views/UserCampains'


function App() {
  

  const styles = css`


    height: 100%;

    .title {
      font-size: 3rem;
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
                <Route path="campains" element={<UserCampains/>}/>

                <Route path="*" element={<NoMatch/>}/>

              </Route>

              <Route path="*" element={<NoMatch/>}/>

            </Route>

            <Route path="/login" element={<Login/>}/>
            <Route path="/regist" element={<Regist/>}/>
            <Route path="/recover-password" element={<RecoverPassword/>}/>

            <Route path="*" element={<NoMatch/>}/>          
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
    <div>
      <h1 className="title">Dame Una Pata</h1>
      <button onClick={toggleMenu}>Menu</button>

      <MainMenu show={showMenu} onClose={toggleMenu}/>

      <Outlet/>

    </div>

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
