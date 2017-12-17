import { h }  from 'preact'
import { connect } from 'preact-fela'

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
  return (
    <div>
      {label && <div className={styles.labelRule}>{label}</div>}
      <input className={styles.inputRule} placeholder={placeholder} />
    </div>
  )
})

export default Input