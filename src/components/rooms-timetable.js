import { h, Component } from 'preact'
import Divider from './divider'
import { connect } from 'preact-fela'
import EventTooltip from './event-tooltip'
import Room from './room'
import RoomCollapsed from './room-collapsed'
import TimetableEvents from './timetable-events'
import DateSwitcher from '../containers/date-switcher'
import { TimetableEvent } from './timetable-events'

import CurrentTime from './current-time'
import RemoveEventConfirm from './remove-event-confirm'
import Modal from './modal'
import Spin from './spin'

import s from '../styles/rooms-timetable.css'

import { range, compose, prepend, toString, map, append } from 'ramda'

const ArrayFrom8AM = compose(
  append('0:00'),
  prepend('8:00'),
  map(toString))(range(9, 24)
)

const LEFT_BAR_WIDTH = 180

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

class RoomsTimetable extends Component {
  constructor() {
    super()
    this.handleScroll = this.handleScroll.bind(this)
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
    window.requestAnimationFrame(() => {
      if (this.container.scrollLeft > 170 && !this.state.isRoomsCollapsed) {
        this.toggleRoomsCollapsed()
      }
      if (this.container.scrollLeft < 170 && this.state.isRoomsCollapsed) {
        this.toggleRoomsCollapsed()
      }
      this.blocks.style.transform = `translate(${-this.container.scrollLeft}px, 0px)`
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
            eventsScrollWidth={this.state.eventsScrollWidth} />
        </div>
      )
    })
    return renderedRooms
  }

  componentDidMount() {
    window.container = this.container
    const eventsScrollWidth = this.container.scrollWidth - LEFT_BAR_WIDTH
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
            ref={(ref) => this.container = ref}>
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
              {ArrayFrom8AM.map(time => (
                <div className={s.time}>{time}</div>
              ))}
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
