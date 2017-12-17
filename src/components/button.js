import { h } from 'preact'
import { connect } from 'preact-fela'
import Arrow from '../assets/arrow.svg'

const rule = (state) => {
  console.log(state)
  const { theme, type } = state

  const { normal, pressed, disabled } = theme.colors.button[type]
  return {
    fontFamily: 'HelveticaNeue-Medium',
    textAlign: 'center',
    padding: '5px 10px',
    backgroundColor: normal,
    height: '44px',
    width: type === 'create' ? '172px' : '103px',
    fontSize: '15px',
    borderRadius: '5px',
    color: type === 'create'
      ? !state.disabled ? 'white' : '#3300000'
      : !state.disabled ? 'black' : '#3300000',
    border: 0,
    ':hover': {
      // boxShadow: '0 0 2px rgb(70, 70, 70)'
    },
    ':disabled': {
      background: disabled
    },
    ':focus': {
      backgroundColor: pressed,
      outline: 'rgba(0, 0, 0, 1)'
    }
  }
}

const Button = ({disabled, children, styles, type}) => {
  console.log(disabled)
  return (
    <button className={styles.rule} disabled={disabled}>
      {children}
    </button>
  )
}

const ButtonWrapped = connect({rule})(Button)

export const ButtonCreateMeeting = (props) => (
  <ButtonWrapped type='create' {...props}>Создать встречу</ButtonWrapped>
)

export const ButtonCancel = (props) => (
  <ButtonWrapped type='cancel' {...props}>Отменить</ButtonWrapped>
)

export default ButtonWrapped
