import { css } from '@emotion/react'

const Button = (props) => {
  const { children, type } = props

  const CSS = css`
  
    display: block;

    width: 100%;
    padding: 1rem 1rem;
    background-color: var(--primary-color);

    color: var(--black);
    font-weight: bold;
    

    border: 0px;
    border-radius: .5rem;

    transition: all .2s ease;

    &:hover {
      background-color: var(--primary-dark);
    }

    &:active {
      background-color: var(--primary-dark);
    }

    &:focus {
      outline: none;
      background-color: var(--primary-dark); 
    }

    &.error {
      background-color: hsl(0deg 95% 62%);
    }
  
  `

  let className = "button"
  console.log({type})
  className += (type === "error") ? ' error' : ''

  return (
    <button 
      className={className}
      css={CSS}
      {...props}>

        {children}

    </button>
  )
}

export default Button