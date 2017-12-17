import { h, Component } from 'preact'
import { connect } from 'preact-fela'
import Button, { ButtonCreateMeeting, ButtonCancel } from './button'
import { BigDivider } from './divider'

import Input from './input'

const sBlock = {
  padding: '16px 16px 20px',
  display: 'flex',
  flexDirection: 'column'
}

class BookRoom extends Component {
  render() {
    return (
      <div>
        <div style={sBlock}>
          <h1>Новая встреча</h1>

          <Input label='Тема' placeholder='О чём будете говорить?' />

          Дата и время
          <input placeholder='О чём будете говорить?' />
          <input value='16:00' />
          <input value='16:30' />
          <input value='16:30' />
        </div>
        <BigDivider />
        <div style={sBlock}>
          <Input label='Участники' placeholder='Например, Тор Одинович' />
        </div>
        <BigDivider />

        Рекомендованные переговорки

        Выберите переговорку

        <ButtonCreateMeeting disabled/>
      </div>
    )
  }
}

export default BookRoom
