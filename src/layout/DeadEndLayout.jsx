import { css } from '@emotion/react'
import DeadEndMenu from '@/components/DeadEndMenu'

const DeadEndLayout = (props) => {
  const { children } = props

  const CSS = css`
    background: var(--gainsboro);
    height: 100vh;
  
  `

  return (
    <div css={CSS}>
      <DeadEndMenu/>
      {children}
    </div>
  )
}

export default DeadEndLayout