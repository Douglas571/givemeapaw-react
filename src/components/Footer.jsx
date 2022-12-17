import { css } from '@emotion/react'

const CSS = css`
  padding: 3rem;
  text-align: center;

  background: var(--onyx);
  color: var(--cultured);
  
`

const Footer = () => {
  return (
    <div css={CSS}>
      Copyright 2022 - Dame Una Pata
    </div>
  )
}

export default Footer