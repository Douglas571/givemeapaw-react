import { useState } from 'react'
import { css, useTheme } from '@emotion/react'

// Components
import MainMenu from '@/components/MainMenu'
import IconButton from '@/components/IconButton.jsx'

function NavBar(props) {
    const theme = useTheme()
    const [showMenu, setShowMenu] = useState(false)

    const menuCSS = css`

        display: flex;
        align-items: center;
        padding: 1rem;

        background: ${theme.colors.white};
        box-shadow: 0px 2px 7px rgba(100,100,100,0.5);

        & h1 {
            /* border: 1px solid red; */

            flex: 1;

            text-align: center;

            color: ${theme.colors.primary};
            font-size: 16px;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            font-weight: bold;
        
        }

        & button {
            position: absolute;
            right: 10px;
        }
    `

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }    

    return (
        <>
            <MainMenu show={showMenu} onClose={toggleMenu}/>
            <div css={menuCSS}>
                <h1>Give Me A Paw</h1>
                <IconButton 
                    be="menu"
                    color={theme.colors.primary}
                    onClick={toggleMenu}/>
            </div>
        </>
    )
}

export default NavBar