import { useState } from 'react'
import { css } from '@emotion/react'

const CSS = css`
  display: flex;
  align-items: center;
  overflow: hidden;

  padding: 1.5rem;
  margin-bottom: 1rem;
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
  const { value, onInput } = props

  const onFocus = (evt) => {
    console.log('focus')
    setIsFocus(true)
  }

  const onBlur = (evt) => {
    console.log('blur')
    setIsFocus(false)
  }

  const onUpdate = (evt) => {
    
    onInput(evt.target.value)
  }

  const handleArrow = (evt) => {
    const { code } = evt

    let newValue = 0
    if (code === "ArrowUp") {
      console.log("+1")
      newValue = +(value + 0.1).toFixed(12) // 0.3
      onInput(newValue)
    }

    if (code === "ArrowDown") {
      console.log("-1")
      newValue = +(value - 0.1).toFixed(12) // 0.3
      onInput(newValue)
    }

  }

  //TO-DO: Implement a non 'type="number"'
  // onKeyDown={handleArrow}

  const className = isFocus ? ' focus' : ''

  return (
    <div css={CSS} className={className}>
      <div className="currency"><span className="simbol">$</span><span>USD</span></div>
      <div className="amount">
        <input 
          type="number"
          placeholder="1.00"
          inputMode="decimal"
          step="0.01"

          value={value}

          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onUpdate}

          {...{ ...props, onInput: undefined }}
          />
      </div>
    </div>
  )


}

export default DonationPanelInput