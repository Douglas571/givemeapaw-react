import { useState } from 'react'
import { css, useTheme } from '@emotion/react'

import NavBar from '@/components/NavBar'

const CSS = css`
  min-height: 100vh;
`

const Home = () => {
    const theme = useTheme()

    return (
        <>
            <NavBar/>
            <div css={CSS}>                
                <h1>Home</h1>
            </div>
        </>
    )
}

export default Home