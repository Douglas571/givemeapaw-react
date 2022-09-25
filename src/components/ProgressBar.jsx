import { css } from '@emotion/react'

const CSS = css`
  height: .6rem;

  margin-bottom: 1rem;
  background-color: var(--white);

  border-radius: 30px;
  overflow: hidden;    

  div {
    background-color: var(--primary-color);
    height: 100%;
    width: 0%;

    transition: all .5s ease .5s;
  }

`

const ProgressBar = (props) => {
  const { percent } = props

  return (
    <div className="progress-bar" css={CSS}>
      <div style={{width: `${percent}%`}}></div>
    </div>
  )
}

export default ProgressBar