import {css, useTheme} from '@emotion/react'

const Box = ({children}) => {
  const theme = useTheme()
  const CSS = css`
  
    padding: 1.5rem 2rem;

    background-color: ${theme.colors.white};
    border-radius: 5px;
    box-shadow:  0px 2px 4px 0px #7F646464;

    h1 {
      font-weight: bold;
      font-size: 3.5rem; 
      line-height: 3.5rem;
      color: ${theme.colors.gray};
    }

    span {
      font-size: 5rem;
    }
  `

  return (
    <div css={CSS} 
      className='
        mb-5'
    >{children}</div>)
}

export default Box