import React from 'react';
import { css } from '@emotion/react';

const CSS = css`
  height: .6rem;

  margin-bottom: 1rem;

  border-radius: 30px;
  overflow: hidden;    

  div {
    height: 100%;
    width: 0%;

    transition: all .5s ease .5s;
  }
`;
/*
  this take 1 argument, the current progress in percent
*/
function ProgressBar(props) {
  const { percent } = props;

  return (
    <div className="progress-bar bg-divisor" css={CSS}>
      <div className='bg-primary' style={{width: `${percent}%`}}></div>
    </div>
  )
}

export default ProgressBar