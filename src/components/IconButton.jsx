import { css } from '@emotion/react'
import Icon from '@/components/Icon'

const IconButton = (props) => {
  
  const { be, color, icon } = props

  const CSS = css`
    border: 1px solid transparent;
    background: transparent;

    color: ${color};

    width: 3rem;
    height: 3rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 100%;

    transition: all .3s ease;

    &:active {
      background: hsla(0, 0%, 0%, .1);
    }

  `

  return (
    <button 
      css={CSS}
      {...props}>
      <Icon 
        be={be}
        {...icon}/>
    </button>
  )
}

export default IconButton