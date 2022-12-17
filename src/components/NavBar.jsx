import { css, useTheme } from '@emotion/react'


import IconButton from '@/components/IconButton.jsx'

function NavBar(props) {
    const { onMenuClick } = props
    const theme = useTheme()

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

    return (
        <div css={menuCSS}>
            <h1>Give Me A Paw</h1>
            <IconButton 
                be="menu"
                color={theme.colors.primary}
                onClick={onMenuClick}/>
        </div>
    )
}

export default NavBar