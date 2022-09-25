import { useState } from 'react'
import { css } from '@emotion/react'

const CSS = css`
  display: flex;
  align-items: center;
  overflow: hidden;

  padding: 1.5rem;
  border: 1px solid var(--gray);

  color: var(--black);

  border-radius: 5px;

  height: 8rem;

  transition: all .5s ease;

  &.focus {
    border: 2px solid orange;
  }

  .amount {
    flex: 1;
  }

  .currency {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    font-weight: 600;

    .simbol {
      font-size: 2.5rem;
      font-weight: 700;    
    }
  }

  input {
    font-family: sans-serif;

    font-size: 3rem;
    font-weight: 700;

    text-align: right;
    width: 100%;
    height: 100%;
    background: inherit;

    border: none;

    &:hover {
      outline: none;
    }

    &:focus-visible {
      outline: none;
    }
  }

  
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  input[type=number] {
    -moz-appearance: textfield; 
  }

`

const DonationPanelInput = (props) => {
  const [isFocus, setIsFocus] = useState(false);
  const { onValue } = props

  const onFocus = (evt) => {
    console.log('focus')
    setIsFocus(true)
  }

  const onBlur = (evt) => {
    console.log('blur')
    setIsFocus(false)
  }

  const onUpdate = (evt) => {
    console.log('update: ', evt.target.value)
    onValue(evt.target.value)
  }

  //to-do: Inplement a onFocus styles.

  const className = isFocus ? ' focus' : ''

  return (
    <div css={CSS} className={className}>
      <div className="currency"><span className="simbol">$</span><span>USD</span></div>
      <div className="amount">
        <input type="text" 
          placeholder="1.00"
          inputMode="decimal"
          step="0.01"

          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onUpdate}

          {...props}
          />
      </div>
    </div>
  )


}

export default DonationPanelInput