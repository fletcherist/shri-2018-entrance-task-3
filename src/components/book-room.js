import { h, Component } from 'preact'
import { connect } from 'preact-fela'
import Button, { ButtonCreateMeeting, ButtonCancel } from './button'
import { BigDivider, EmptyDivider } from './divider'

import Input, { DateInput } from './input'
import { TextLabel, TextHeadline } from './text'
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
          <TextHeadline>Новая встреча</TextHeadline>

          <Input label='Тема' placeholder='О чём будете говорить?' />
          <EmptyDivider />
          <DateInput label='Дата и время' value='2017-12-17' onChange={this.handleChange} />
          {<EmptyDivider height={8} />}
          <div style={{display: 'flex', alignItems: 'center'}}>
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
        <div style={{
          position: 'fixed',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          zIndex: '3',
          bottom: 0
        }}>
          <div style={{
            padding: '12px 16px 13px',
            fontWeight: 'bold',
            fontSize: '15px',
            backgroundColor: 'rgba(0,16,33,0.80)',
            color: 'white',
            opacity: '0.93'
          }}>Выберите переговорку</div>
          <div style={{
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              padding: '16px 0px 20px'
            }}>
              <ButtonCreateMeeting disabled />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookRoom
