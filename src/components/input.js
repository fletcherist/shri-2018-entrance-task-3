import { h }  from 'preact'
import { connect } from 'preact-fela'
import { mergeDeepLeft } from 'ramda'
import CalendarIcon from '../assets/calendar.svg'
import { TextLabel } from './text'

const inputRule = state => ({
  width: '100%',
  padding: '13px 10px 14px',
  fontSize: '15px',
  border: '2px solid rgba(233,236,239,1)',
  boxSizing: 'border-box',
  borderRadius: '4px',
  ':placeholder': {
    color: '#858E98'
  },
  ':focus': {
    outline: 'none',
    borderColor: '#007DFF'
  }
})

const labelRule = state => ({
  '@media (max-width: 700px)': {
    opacity: state.hideLabelOnMobile ? 0 : 1
  }
})

const Input = connect({
  inputRule,
  labelRule
})(({
  placeholder, value, styles, label, onInput,
  onClick, ref, onFocusOut, onFocus, hideLabelOnMobile
}) => {
  return (
    <div>
      {label && 
        (<div className={styles.labelRule}>
          <TextLabel className={styles.labelRule}>
            {label}
          </TextLabel>
        </div>
      )}
      <input className={styles.inputRule} placeholder={placeholder} value={value}
        onInput={onInput} onClick={onClick} ref={ref} onFocusOut={onFocusOut}
        onFocus={onFocus} />
    </div>
  )
})

const dateInputRule = state => mergeDeepLeft(inputRule(state), {
  padding: '0px',
  fontFamily: 'HelveticaNeue',
  color: '#858E98',
  ':after': {
    content: ' ',
    height: '50px',
    width: '50px',
    position: 'absolute',
    backgroundColor: 'blue'
  },
  '::-webkit-inner-spin-button': {
    display: 'none'
  }
})

export const DateInput = connect({
  inputRule: dateInputRule,
})(({
  placeholder, value, styles, label, onInput
}) => (
  <div>
    {label && <TextLabel>{label}</TextLabel>}
    <input className={styles.inputRule} type='date'
      onInput={onInput}
      value={value}
      placeholder={placeholder}
      max='3000-12-31' />
  </div>
))

export default Input
