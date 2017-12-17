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
    borderColor: 'rgba(0, 0, 0, .12)'
  }
})

const Input = connect({
  inputRule
})(({
  placeholder, value, styles, label
}) => {
  return (
    <div>
      {label && <TextLabel>{label}</TextLabel>}
      <input className={styles.inputRule} placeholder={placeholder} value={value} />
    </div>
  )
})

const dateInputRule = state => mergeDeepLeft(inputRule(state), {
  padding: '0px',
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
  placeholder, value, styles, label
}) => (
  <div>
    {label && <TextLabel>{label}</TextLabel>}
    <input className={styles.inputRule} type='date'
      value={value}
      placeholder={placeholder}
      max='3000-12-31' />
  </div>
))

export default Input
