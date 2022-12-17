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

function App() {
    const CSS = css`
        background: ${Theme.colors.background};
    `

    return (
        <ThemeProvider theme={Theme}>
            <AuthProvider>
                <div className='App' css={CSS}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
            </AuthProvider>
        </ThemeProvider>
        
    )
}

export default App