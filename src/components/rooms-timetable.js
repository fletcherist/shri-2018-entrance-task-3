// @flow

import { h, Component } from 'preact'
import Divider from './divider'
import { connect } from 'preact-fela'
import Room from './room'
import RoomCollapsed from './room-collapsed'
import TimetableEvents from './timetable-events'
import DateSwitcher from '../containers/date-switcher'
import { TimetableEvent } from './timetable-events'
import EventTooltip from '../containers/event-tooltip'

import CurrentTime from './current-time'
import RemoveEventConfirm from './remove-event-confirm'
import Modal from './modal'
import Spin from './spin'

import { isMobile } from '../utils'

import s from '../styles/rooms-timetable.css'
import cx from 'classnames'

import { range, compose, prepend, toString, map, append } from 'ramda'

const throttle = (ms, func) => {
  let wait = false,
    savedThis,
    savedArgs

  return function wrapper() {
    if (wait) {
      savedThis = this
      savedArgs = arguments
      return
    }

    func.apply(this, arguments)
    wait = true

    setTimeout(() => {
      wait = false
      wrapper.apply(savedThis, savedArgs)
    }, ms)
  }
}

const ArrayFrom8AM = compose(
  prepend('8:00'),
  map(toString))(range(9, 24)
)

const NUMBERS_FROM_8AM = range(8, 24)

const LEFT_BAR_WIDTH = 260
const LEFT_BAR_WIDTH_MOBILE = 194

const floorStyles = state => ({})
const Floor = connect({
  floorStyles
})(({ level, styles }) => (
  <div className={s.floor}><b>{level} этаж</b></div>
))

const roomWithEventsStyles = state => ({
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid #E9ECEF',
  backgroundColor: 'white'
})
const RoomWithEvents = connect({
  roomWithEventsStyles
})(({
  styles,
  roomName,
  roomEvents,
  roomCapacity,
  eventsScrollWidth
}) => (
  <div className={styles.roomWithEventsStyles}>
    <Room name={roomName} capacity={roomCapacity} />
    <TimetableEvents
      events={roomEvents}
      eventsScrollWidth={eventsScrollWidth} />
  </div>
))

type Props = {
  setCurrentEvent: Function,
  handleEventTooltipModal: Function
};
class RoomsTimetable extends Component<Props> {
  constructor() {
    super()
    this.handleScroll = throttle(1000, this.handleScroll.bind(this))
    this.state = {
      isRoomsCollapsed: false,
      eventsScrollWidth: 0,
      containerHeight: 0
    }
  }

  toggleRoomsCollapsed() {
    this.setState({
      isRoomsCollapsed: !this.state.isRoomsCollapsed
    })
  }

  handleScroll(event) {
    console.log('handling scroll')
    window.requestAnimationFrame(() => {
      if (!this.container) return false
      if (this.container.scrollLeft > 170 && !this.state.isRoomsCollapsed) {
        this.toggleRoomsCollapsed()
      }
      if (this.container.scrollLeft < 170 && this.state.isRoomsCollapsed) {
        this.toggleRoomsCollapsed()
      }
    })
  }

  renderRooms() {
    const renderedRooms = []
    const rooms = this.props.rooms.forEach((room, index, rooms) => {
      const isNeededToRenderFloor =
        index > 0 && (rooms[index - 1].floor !== room.floor) ||
        index === 0

      renderedRooms.push(
        <div className={s.room}>
          {isNeededToRenderFloor &&
            <Floor level={room.floor} />
          }
          <Room name={room.title} capacity={room.capacity} />
        </div>
      )

      renderedRooms.push(
        <div className={s.roomEvents}>
          <TimetableEvents
            events={this.props.eventsInRoom[room.id]}
            eventsScrollWidth={this.state.eventsScrollWidth}
            setCurrentEvent={this.props.setCurrentEvent}
            handleEventTooltipModal={this.props.handleEventTooltipModal} />
        </div>
      )
    })
    return renderedRooms
  }

  componentDidMount() {
    window.container = this.container
    const eventsScrollWidth = 1040 - 18
    const containerHeight = this.container.clientHeight
    this.setState({eventsScrollWidth, containerHeight})
    console.log(eventsScrollWidth)
  }

  render() {
    const {
      isRoomsCollapsed
    } = this.state
    return (
      <div>
        <div>
          <div className={s.dateSwitcherMobile}>
            <DateSwitcher />
          </div>
          <div className={s.container}
            ref={(ref) => this.container = ref}
            onScroll={this.handleScroll}>
            <div className={s.dateSwitcher}>
              <div className={s.dateSwitcherMobileInner}>
                <DateSwitcher />
              </div>
            </div>
            <div className={s.timetable}>
              <CurrentTime
                eventsScrollWidth={this.state.eventsScrollWidth}
                containerHeight={this.state.containerHeight}
              />
              {ArrayFrom8AM.map((time, index) => (
                <div className={cx({
                  [s.time]: true,
                  [s.timeInactive]: new Date().getHours() > NUMBERS_FROM_8AM[index]
                })}>{time}</div>
              ))}
              <EventTooltip />
            </div>
            <div className={s.wrapper}>
              {this.renderRooms()}
              <div className={s.eventsArea}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RoomsTimetable
