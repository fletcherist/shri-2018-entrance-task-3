// @flow

import { h, Component } from 'preact'
import { connect } from 'preact-fela'
import { merge } from 'ramda'
import Button, { ButtonCreateMeeting, ButtonCancel } from './button'
import { BigDivider, EmptyDivider } from './divider'

import Input, { DateInput } from './input'
import { TextLabel, TextHeadline } from './text'
import RecommendedRoom from './recommended-room'
import { formatDateTime, isMobile } from '../utils'
import AutocompleteUsers from '../containers/autocomplete-users'

import cx from 'classnames'

import s from '../styles/book-room.css'

type Props = {
  createEvent: Function,
  handleTitleInput: Function
};

const BookRoom = connect({

})
(class BookRoom extends Component<Props> {
  constructor() {
    super()
    this.state = {
      values: {
        title: '123',
        date: '2017-10-10',
        timeStart: '13:00',
        timeEnd: '13:30',
      },
      usersIds: [],
      isReadyForCreating: false
    }
    this.handleTitleInput = this.handleTitleInput.bind(this)
    this.handleDateInput = this.handleDateInput.bind(this)
    this.handleTimeStartInput = this.handleTimeStartInput.bind(this)
    this.handleTimeEndInput = this.handleTimeEndInput.bind(this)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.setParticipants = this.setParticipants.bind(this)
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
      dateEnd: formatDateTime(date, timeEnd),
      usersIds: this.state.usersIds
    })
  }

  setParticipants(participants) {
    console.log('setting participants', participants)
    this.setState({
      usersIds: participants
    })
  }

  render() {
    const { title, date, timeStart, timeEnd } = this.state.values
    return (
      <div>
        <div className={s.headline}>
          <TextHeadline>Новая встреча</TextHeadline>
        </div>
        <div className={s.container}>
          <div className={s.infoBlock__title}>
            <div className={s.content}>
              <Input label='Тема' placeholder='О чём будете говорить?'
                value={title}
                onInput={this.handleTitleInput} />
              <EmptyDivider />
            </div>
          </div>
          <div className={s.infoBlock__datetime}>
            <div className={cx(s.content, s.infoBlock__datetime_wrapper)}>
              <DateInput label='Дата и время' value={date}
                onInput={this.handleDateInput} />
              {/*<EmptyDivider height={8} />*/}
              <div className={s.timeInput}>
                <Input onInput={this.handleTimeStartInput}
                  label='Начало'
                  hideLabelOnMobile
                  placeholder='13:00'
                  value={timeStart} />
                <div className={s.timeInputDash}>—</div>
                <Input onInput={this.handleTimeEndInput}
                  label='Конец'
                  hideLabelOnMobile
                  placeholder='13:30'
                  value={timeEnd} />
              </div>
            </div>
            <div className={s.mobileDivider}><BigDivider /></div>
          </div>
          <div className={s.infoBlock__participants}>
            <div className={s.content}>
              <AutocompleteUsers setParticipants={this.setParticipants} />
            </div>
            <div className={s.mobileDivider}><BigDivider /></div>
          </div>

          <div className={s.infoBlock__rooms}>
            <div className={s.content}>
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
          </div>
        </div>
        <div className={s.footer}>
            <div className={s.footerNotification}>Выберите переговорку</div>
            <div className={s.footerCreateRoom}>
              <div className={s.footerCreateRommWrapper}>
                <ButtonCreateMeeting disabled={!this.state.isReadyForCreating}
                  onClick={this.handleSubmit} />
              </div>
            </div>
          </div>
      </div>
    )
  }
})

export default BookRoom
