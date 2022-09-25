import { css } from '@emotion/react'
import { useNavigate, Link } from 'react-router-dom'

import IconButton from '@/components/IconButton'

const DeadEndMenu = (props) => {
  const navigate = useNavigate()
  const { right } = props

  const CSS = css`
    margin: 1rem;
  `

  const goBack = () => {
    setTimeout(() => navigate('..'), 300)
  }

  return (
    <div css={CSS}>
      <IconButton 
        be="arrow_back"
        onClick={goBack}
      />
      
      { right }
    </div>
  )
}

export default DeadEndMenu