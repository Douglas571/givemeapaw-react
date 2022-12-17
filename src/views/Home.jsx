import { useState } from 'react'
import { css, useTheme } from '@emotion/react'

// Components
import MainMenu from '@/components/MainMenu'

import NavBar from '@/components/NavBar'

const CSS = css`
  
`

const Home = (props) => {
    const theme = useTheme()
    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }    

    return (
        <>
            <MainMenu show={showMenu} onClose={toggleMenu}/>
            <NavBar onMenuClick={toggleMenu}/>
            <h1>Home</h1>
        </>
    )
}

export default Home