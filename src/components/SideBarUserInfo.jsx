import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

import { useAuth } from '@/hooks/Auth'

const CSS = css`

  display: flex;
  align-items: center;
  gap: 1rem;

  padding: 2rem 2rem;
  background: var(--primary-color);

  color: var(--black);
  font-weight: 600;

  .avatar {
    background: white;
    width: 6rem;
    aspect-ratio: 1/1;
    border-radius: 100%;
  }
`

const SideBarUserInfo = (props) => {
  const { user } = useAuth()


  return (
    <div css={CSS}>
      <div className="avatar"></div>
      <Link to="/me">{ user.name + ' ' + user.lastName }</Link>
    </div>
  )
}

export default SideBarUserInfo