import { h }  from 'preact'
import { connect } from 'preact-fela'
import { mergeDeepLeft } from 'ramda'
import CalendarIcon from '../assets/calendar.svg'

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

const labelRule = state => ({
  fontSize: '13px',
  fontWeight: 'bold',
  paddingBottom: '4px'
})
const Input = connect({
  inputRule,
  labelRule
})(({
  placeholder, value, styles, label
}) => {
  console.log('styles', styles)
  return (
    <div>
      {label && <div className={styles.labelRule}>{label}</div>}
      <input className={styles.inputRule} placeholder={placeholder} />
    </div>
  )
})

const dateInputRule = state => mergeDeepLeft(inputRule(state), {
  padding: '0px',
  ':after': {
    content: ' ',
    height: '50px',
    width: '50px',
    position: 'absolute',
    backgroundColor: 'blue'
  }
})

export const DateInput = connect({
  inputRule: dateInputRule
})(({
  placeholder, value, styles, label
}) => (
  <div>
    {label && <div className={styles.labelRule}>{label}</div>}
    <input className={styles.inputRule} placeholder={placeholder} />
  </div>
))

export default Input
