import { css } from '@emotion/react'

const Button = (props) => {
  const { children, type } = props

  const CSS = css`
  `

  let className = "button"
  console.log({type})
  className += (type === "error") ? ' error' : ''

  return (
    <button 
      className={'px-8 py-6 rounded-lg bg-primary text-white font-bold text-2xl ' + className}
      css={CSS}
      {...props}>

        {children}

    </button>
  )
}

export default Button