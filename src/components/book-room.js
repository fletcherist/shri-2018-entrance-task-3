import { h, Component } from 'preact'
import { connect } from 'preact-fela'
import Button, { ButtonCreateMeeting, ButtonCancel } from './button'
import { BigDivider } from './divider'


const inputRule = state => ({
  width: '100%',
  padding: '13px 10px 14px',
  fontSize: '15px',
  border: '2px solid rgba(233,236,239,1)',
  ':placeholder': {
    color: '#858E98'
  },
  ':focus': {
    outlineColor: 'rgba(0, 0, 0, 1)'
  }
})
const Input = connect({inputRule})(({
  placeholder, value, styles, label
}) => {
  console.log(styles.inputRule)
  return (
    <div>
      {label}
      <input className={styles.inputRule} placeholder={placeholder} />
    </div>
  )
})

class BookRoom extends Component {
  render() {
    return (
      <div>
        Новая встреча
        
        <Input label='Тема' placeholder='О чём будете говорить?' />
        <input placeholder='О чём будете говорить?' />
        Дата и время
        <input placeholder='О чём будете говорить?' />
        <input value='16:00' />
        <input value='16:30' />
        <input value='16:30' />

        <BigDivider />
        Участники
        <input placeholder='Например, Тор Одинович' />
        <BigDivider />

        Рекомендованные переговорки

        Выберите переговорку

        <ButtonCreateMeeting disabled/>
      </div>
    )
  }
}

export default BookRoom