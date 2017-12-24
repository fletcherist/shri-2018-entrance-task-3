// @flow

import { h, Component } from 'preact'
import { connect } from 'preact-fela'
import { merge } from 'ramda'
import Button, { ButtonCreateMeeting, ButtonCancel } from './button'
import { BigDivider, EmptyDivider } from './divider'

import Input, { DateInput } from './input'
import { TextLabel, TextHeadline } from './text'
import RecommendedRoom from './recommended-room'
import { formatDateTime } from '../utils'

const sBlock = {
  padding: '16px 16px 20px',
  display: 'flex',
  flexDirection: 'column'
}

type Props = {
  createEvent: Function,
  handleTitleInput: Function
};

class BookRoom extends Component<Props> {
  constructor() {
    super()
    this.state = {
      values: {
        title: '123',
        date: '2017-10-10',
        timeStart: '13:00',
        timeEnd: '13:30',
      },
      isReadyForCreating: false
    }
    this.handleTitleInput = this.handleTitleInput.bind(this)
    this.handleDateInput = this.handleDateInput.bind(this)
    this.handleTimeStartInput = this.handleTimeStartInput.bind(this)
    this.handleTimeEndInput = this.handleTimeEndInput.bind(this)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleTitleInput(event: Event) { this.handleInput('title', event) }
  handleDateInput(event: Event) { this.handleInput('date', event) }
  handleTimeStartInput(event: Event) { this.handleInput('timeStart', event) }
  handleTimeEndInput(event: Event) { this.handleInput('timeEnd', event) }

  handleInput(type: string, event: Event) {
    this.setState({
      values: merge(this.state.values, {
        [type]: event.target.value
      })
    }, () => {
      console.log(this.state)
      const { title, date, timeStart, timeEnd } = this.state.values
      const isReadyForCreating = title && date && timeStart && timeEnd
      this.setState({isReadyForCreating})
    })
    console.log(type, event.target.value)
  }

  handleSubmit() {
    const { title, timeStart, timeEnd, date } = this.state.values
    this.props.createEvent({
      title: title,
      dateStart: formatDateTime(date, timeStart),
      dateEnd: formatDateTime(date, timeEnd)
    })
  }

  render() {
    const { title, date, timeStart, timeEnd } = this.state.values
    return (
      <div>
        <div style={sBlock}>
          <TextHeadline>Новая встреча</TextHeadline>
          <Input label='Тема' placeholder='О чём будете говорить?'
            value={title}
            onInput={this.handleTitleInput} />
          <EmptyDivider />
          <DateInput label='Дата и время' value={date}
            onInput={this.handleDateInput} />
          <EmptyDivider height={8} />
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Input onInput={this.handleTimeStartInput}
              placeholder='13:00'
              value={timeStart} />
            <div style={{padding: '4px'}}>—</div>
            <Input onInput={this.handleTimeEndInput}
              placeholder='13:30'
              value={timeEnd} />
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
              <ButtonCreateMeeting disabled={!this.state.isReadyForCreating}
                onClick={this.handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookRoom
