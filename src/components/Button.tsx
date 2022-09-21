import { css } from '@emotion/react'

const Button = (props) => {
  const { children } = props

  const CSS = css`
  
    display: block;

    width: 100%;
    padding: 1rem 1rem;
    background-color: var(--primary-color);

    color: var(--black);
    font-weight: bold;
    

    border: 0px;
    border-radius: 1rem;

    transition: all .2s ease;

    &:active {
      background-color: var(--primary-dark);
    }

    &:focuse {
      outline: none;
      background-color: var(--primary-dark); 
    }
  
  `

  return (
    <button 
      css={CSS}
      {...props}>

        {children}

    </button>
  )
}

export default Button