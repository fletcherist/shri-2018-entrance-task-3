import { h } from 'preact'
import { connect } from 'preact-fela'
import Arrow from '../assets/arrow.svg'

const rule = (state) => {
  const { theme, type, width } = state

  const { normal, pressed, disabled } = theme.colors.button[type]
  return {
    fontFamily: 'HelveticaNeue-Medium',
    textAlign: 'center',
    padding: '5px 10px',
    backgroundColor: normal,
    cursor: 'pointer',
    height: '36px',
    width: width
      ? `${width}px`
      : type === 'create' ? '172px' : '103px',
    fontSize: '13px',
    borderRadius: '5px',
    color: type === 'create'
      ? !state.disabled ? 'white' : '#3300000'
      : !state.disabled ? 'black' : '#3300000',
    border: 0,
    ':hover': {
    },
    ':disabled': {
      background: disabled
    },
    ':focus': {
      backgroundColor: pressed,
      outline: 'rgba(0, 0, 0, 1)'
    },
    '@media (max-width: 700px)': {
      height: '44px',
      fontSize: '15px'
    }
  }
}

const Button = ({disabled, children, styles, type, onClick}) => {
  return (
    <button className={styles.rule} disabled={disabled} onClick={onClick}>
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

export const ButtonRemove = (props) => (
  <ButtonWrapped type='cancel' {...props}>Удалить</ButtonWrapped>
)

export const ButtonOkay = (props) => (
  <ButtonWrapped type='create' {...props} width={120}>
    Хорошо
  </ButtonWrapped>
)

export default ButtonWrapped
