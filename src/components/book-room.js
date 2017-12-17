import { h, Component } from 'preact'
import { connect } from 'preact-fela'
import Button, { ButtonCreateMeeting, ButtonCancel } from './button'
import { BigDivider, EmptyDivider } from './divider'

import Input, { DateInput } from './input'
import TextLabel from './text-label'
import RecommendedRoom from './recommended-room'

const sBlock = {
  padding: '16px 16px 20px',
  display: 'flex',
  flexDirection: 'column'
}

class BookRoom extends Component {
  handleChange(event) {
    console.log(event)
  }

  render() {
    return (
      <div>
        <div style={sBlock}>
          <h1>Новая встреча</h1>

          <Input label='Тема' placeholder='О чём будете говорить?' />
          <EmptyDivider />
          <DateInput label='Дата и время' value='2017-12-17' onChange={this.handleChange} />
          {<EmptyDivider height={8} />}
          <div style={{display:'flex', alignItems: 'center'}}>
            <Input />
            <div style={{padding: '4px'}}>—</div>
            <Input />
          </div>
        </div>
        <BigDivider />
        <div style={sBlock}>
          <Input label='Участники' placeholder='Например, Тор Одинович' />
        </div>
        <BigDivider />

        <div style={sBlock}>
          <TextLabel>Рекомендованные переговорки</TextLabel>
          <RecommendedRoom
            floor='4'
            timeStart='16:00'
            timeEnd='16:30'
            name='Готем'
          />
          <RecommendedRoom
            floor='4'
            timeStart='16:00'
            timeEnd='16:30'
            name='Готем'
          />
          <RecommendedRoom
            floor='4'
            timeStart='16:00'
            timeEnd='16:30'
            name='Готем'
          />
        </div>

        Выберите переговорку

        <ButtonCreateMeeting disabled />
      </div>
    )
  }
}

export default BookRoom
