import { css } = '@emotion/react'

const Box = (props) => {

  const {children, margin, padding} = props

  let CSS = css`
    margin: ${margin || '2rem'};
    paddin: ${padding || 0};
  `

  return (
    <div css={CSS}>{children}</div>

    )
}

export default Box