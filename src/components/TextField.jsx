import { useId } from 'react'

import { css } from '@emotion/react'

import Icon from '@/components/Icon'

const input = (props) => {

  const { icon } = props
  const id = `input-${useId()}`


  const CSS = css`
    display: flex;
    gap: 1rem;

    margin-bottom: 2rem;

    input {
      width: 100%;

      border: 1px solid transparent;
      border-bottom: 1px solid var(--white);  

      transition: all .2s ease;
    }

    & input:focus {
      outline: none;

      border-bottom: 2px solid var(--black);  
    }
  `

  return (
    <div css={CSS} >
      <label htmlFor={id}>
        {icon}
      </label>
      <input 
        id={id}
        type="text" 

        {...props}
        />
    </div>
  )
}

export default input