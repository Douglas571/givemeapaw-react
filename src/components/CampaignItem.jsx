import { Link } from 'react-router-dom'
import { css } from '@emotion/react'

import ProgressBar from '@/components/ProgressBar'

const CSS = css`
  background-color: white;

  box-shadow: 1px 1px 5px 1px var(--gray);
  border-radius: 5px;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  .title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .content {
    flex: 1;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .progress {
    margin-bottom: 2rem;
  }

`

// ! DELETE THIS
const CampaignItem = (props) => {
  const { campaign } = props
  const c = campaign

  const percent_raised = (c.goal * c.raised) / 100

  const imgCSS = css`
    .img {
      width: 100%;
      min-height: 0;
      aspect-ratio: 4/3;

      background: url(${c.img});
      background-size: cover;
      background-position: center;
    }
  `

  return (
    
    <Link
      to={'/campaigns/' + c.id } 
      css={[CSS, imgCSS]}
      className="campaign"
    >
      <div className="img"></div>              
      <div className="content">
        <div>
          <h1 className="title">{c.title}</h1>
          <div className="progress">
            <ProgressBar percent={percent_raised}/>
            <p>
              <span className="u-strong">Recaudado:</span> {c.raised}$
            </p>
            <p>
              <span className="u-strong">Objetivo:</span> {c.goal}$
            </p>
          </div>
        </div>
      </div>

      
    </Link> 
  )
}

export default CampaignItem