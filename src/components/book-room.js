// @flow

import { h, Component } from 'preact'
import { merge } from 'ramda'
import Button, {
  ButtonCreateMeeting,
  ButtonCancel,
  ButtonRemoveEvent,
  ButtonSave
} from './button'
import { BigDivider, EmptyDivider, HorizontalDivider } from './divider'

import Input, { DateInput } from './input'
import { TextLabel, TextHeadline } from './text'
import { formatDateTime, isMobile } from '../utils'
import AutocompleteUsers from '../containers/autocomplete-users'
import RecommendedRooms from '../containers/recommended-rooms'

import {
  BOOKING_ROOM_TYPE_EDITING,
  BOOKING_ROOM_TYPE_CREATING
} from '../actions/actionTypes'

import cx from 'classnames'
import s from '../styles/book-room.css'

import {
  formatMinutes,
  formatHours,
  formatMonths,
  formatDate
} from '../utils/formatTimeIntoEventTooltip'

import type { appBookingRoomType } from '../actions/app'

type Props = {
  createEvent: Function,
  editEvent: Function,
  handleTitleInput: Function,
  tryRemoveEvent: Function,
  currentEvent: Object,
  bookingRoomType: appBookingRoomType
};

const convertDateToInputDatetime = date => {
  date = new Date(date)
  return [
    date.getFullYear(),
    formatMonths(date.getMonth() + 1),
    formatDate(date.getDate())
  ].join('-')
  // year-month-date
}
const convertHoursMinutesToInputDatetime = time => {
  time = new Date(time)
  return [time.getHours(), formatMinutes(time.getMinutes())].join(':')
}

const getDateEndTypeCreating = time => {
  const newDate = new Date(time)
  newDate.setHours(newDate.getHours() + 1)
  return convertHoursMinutesToInputDatetime(newDate)
}

class BookRoom extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.state = {
      values: {
        title: props.currentEvent.title || '',
        date: convertDateToInputDatetime(props.currentEvent.dateStart),
        timeStart: convertHoursMinutesToInputDatetime(props.currentEvent.dateStart),
        timeEnd: convertHoursMinutesToInputDatetime(props.currentEvent.dateEnd)
      },
      usersIds: [],
      isReadyForCreating: false
    }

    this.state.values.timeEnd = props.bookingRoomType === BOOKING_ROOM_TYPE_CREATING
      ? getDateEndTypeCreating(props.currentEvent.dateEnd)
      : convertHoursMinutesToInputDatetime(props.currentEvent.dateEnd)

    this.handleTitleInput = this.handleTitleInput.bind(this)
    this.handleDateInput = this.handleDateInput.bind(this)
    this.handleTimeStartInput = this.handleTimeStartInput.bind(this)
    this.handleTimeEndInput = this.handleTimeEndInput.bind(this)
    this.handleRemoveEvent = this.handleRemoveEvent.bind(this)

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

    if (this.props.bookingRoomType === BOOKING_ROOM_TYPE_CREATING) {
      this.props.createEvent({
        title: title,
        dateStart: formatDateTime(date, timeStart),
        dateEnd: formatDateTime(date, timeEnd),
        usersIds: this.state.usersIds
      })
    } else if (this.props.bookingRoomType === BOOKING_ROOM_TYPE_EDITING) {
      this.props.editEvent({
        title: title,
        dateStart: formatDateTime(date, timeStart),
        dateEnd: formatDateTime(date, timeEnd),
        usersIds: this.state.usersIds
      })
    }
  }

  handleRemoveEvent() {
    this.props.tryRemoveEvent()
  }

  setParticipants(participants) {
    this.setState({
      usersIds: participants
    })
  }

  render() {
    const { title, date, timeStart, timeEnd } = this.state.values
    return (
      <div>
        <div className={s.headline}>
          <TextHeadline>
            {this.props.bookingRoomType === BOOKING_ROOM_TYPE_CREATING && 'Новая встреча'}
            {this.props.bookingRoomType === BOOKING_ROOM_TYPE_EDITING && 'Редактирование встречи'}
          </TextHeadline>
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
              <AutocompleteUsers
                setParticipants={this.setParticipants}
              />
            </div>
            <div className={s.mobileDivider}><BigDivider /></div>
          </div>

          <div className={s.infoBlock__rooms}>
            <div className={s.content}>
              <TextLabel>Рекомендованные переговорки</TextLabel>
              <RecommendedRooms />
            </div>
          </div>
        </div>
        <div className={s.footer}>
          <div className={s.footerNotification}>Выберите переговорку</div>
          <div className={s.footerCreateRoom}>
            <div className={s.footerCreateRommWrapper}>
              {this.props.bookingRoomType === BOOKING_ROOM_TYPE_CREATING && (
                <ButtonCreateMeeting disabled={!this.state.isReadyForCreating}
                onClick={this.handleSubmit} />
              )}
              {this.props.bookingRoomType === BOOKING_ROOM_TYPE_EDITING && (
                <div>
                  <ButtonCancel onClick={() => window.location.hash = '#/'} />
                  <HorizontalDivider width={10} />
                  <ButtonRemoveEvent onClick={this.handleRemoveEvent} width={180} />
                  <HorizontalDivider width={10} />
                  <ButtonSave />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookRoom
