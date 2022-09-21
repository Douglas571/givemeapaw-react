import { css } from '@emotion/react'

const Icon = (props) => {
  let { className = '', be } = props

  className = 'icon material-icons-round ' + className 

  const CSS = css`
    --size: 2rem;
    pointer-events: none;
    font-size: var(--size);
    width: var(--size);
    height: var(--size);
  `

  let iconSize = {
    
  }

  return (
    <span 
      css={[CSS, iconSize]}
      className={className}>{be}</span>
    )
}

export default Icon