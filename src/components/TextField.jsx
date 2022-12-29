import { useId, useState } from 'react'

import { css } from '@emotion/react'

import Icon from '@/components/Icon'

const input = (props) => {

  const { icon } = props
  const id = `input-${useId()}`


  const CSS = css`
    display: flex;
    gap: 1rem;

    margin-bottom: 2rem;

    & input:focus {
      outline: none;      
    }

  `

  const [focus, setFocus] = useState(false)
  const toggleFocus = () => {
    setFocus(!focus)
  }

  let base = 'px-2 rounded-[3px]'
  let outer = (focus)? ' border-2' : ' border-[1px]'

  let classOuter = base + outer

  return (
    <div css={CSS} className={classOuter}>

      {icon && (
        <label htmlFor={id} className='flex align-center items-center'>
          {icon}
        </label>
      )}
      
      
      <input 
        className='w-[100%]'
        id={id}
        type="text" 

        onFocus={toggleFocus}
        onBlur={toggleFocus}

        {...props}
        />
    </div>
  )
}

export default input