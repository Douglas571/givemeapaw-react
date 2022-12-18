import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useLocation,
  
    Outlet,
    Navigate
} from 'react-router-dom'

import { css, ThemeProvider, useTheme } from '@emotion/react'

import { AuthProvider, useAuth } from '@/hooks/Auth'

import Theme from '@/theme.js'

import Home from '@/views/Home.jsx'
import Login from '@/views/Login'
import User from '@/views/User.jsx'


function App() {
    const CSS = css`
        background: ${Theme.colors.background};
    `

    return (
        <ThemeProvider theme={Theme}>
            <AuthProvider>
                <div className='App' css={CSS}>
                    <BrowserRouter>
                    <div>
                        <Link to='/'>Home</Link>
                        <Link to='/login'>Login</Link>
                    </div>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="me" element={<ProtectedRoute/>}>
                                <Route index element={<User/>}/>
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