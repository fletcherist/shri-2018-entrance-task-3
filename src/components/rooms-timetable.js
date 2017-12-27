import { h, Component } from 'preact'
import Divider from './divider'
import { connect } from 'preact-fela'
import EventTooltip from './event-tooltip'
import Room from './room'
import RoomCollapsed from './room-collapsed'
import TimetableEvents from './timetable-events'
import DateSwitcher from './date-switcher'
import { TimetableEvent } from './timetable-events'

import RemoveEventConfirm from './remove-event-confirm'
import Modal from './modal'

import s from '../styles/rooms-timetable.css'

import { range, compose, prepend, toString, map } from 'ramda'

const ArrayFrom8AM = compose(prepend('8:00'), map(toString))(range(9, 24))

const LEFT_BAR_WIDTH = 180

/* TimeBlock styles  */
const sTime = {
  container: {
    display: 'flex',
    overflow: 'auto',
    // transform: 'translate(180px, 0)'
    paddingLeft: '180px'
  },
  element: {
    minWidth: '49px',
    marginLeft: '28px',
    padding: '9px 0px 10px 0',
    textAlign: 'center',
    fontSize: '11px',
    color: '#858E98',
    letterSpacing: '0.4px'
    // borderBottom: '1px solid #E9ECEF'
  },
  line: {
    borderLeft: '1px solid rgba(19,100,205,0.10)',
    // position: 'absolute',
    height: '500px',
    // overflow: 'scroll',
    marginLeft: '-24px'
  }
}

// background: #D5DFE9;

const sEvents = {
  height: '58px',
  minWidth: '150px',
  // zIndex: '-999'
}

const floorStyles = state => ({
  fontSize: '11px',
  color: '#858E98',
  letterSpacing: '0.4px',
  padding: '16px 16px 8px',
  zIndex: '-1',
  textTransform: 'uppercase'
})
const Floor = connect({
  floorStyles
})(({ level, styles }) => (
  <div className={styles.floorStyles}><b>{level} этаж</b></div>
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
      eventsScrollWidth: 0
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

  // renderRooms() {
  //   console.log(this.props.rooms)
  //   return (
  //     <div style={{position: 'absolute', zIndex: '-1', top: '30px'}}
  //       ref={(ref) => this.blocks = ref}>
  //       {this.props.rooms.map((room, index, rooms) => {
  //         const isNeededToRenderFloor =
  //           index > 0 && (rooms[index - 1].floor !== room.floor) ||
  //           index === 0
  //         return (
  //           <div>
  //             {isNeededToRenderFloor &&
  //               <div><Floor level={room.floor} /></div>
  //             }
  //             <RoomWithEvents
  //               roomName={room.title}
  //               roomCapacity={room.capacity}
  //               roomEvents={this.props.eventsInRoom[room.id]}
  //               eventsScrollWidth={this.state.eventsScrollWidth}
  //             />
  //           </div>
  //         )
  //       }
  //       )}
  //     </div>
  //   )
  // }

  // renderRooms() {
  //   const rooms = this.props.rooms()
  // }

  componentDidMount() {
    window.container = this.container
    const eventsScrollWidth = this.container.scrollWidth - LEFT_BAR_WIDTH
    this.setState({eventsScrollWidth})
    console.log(eventsScrollWidth)
  }

  render() {
    const {
      isRoomsCollapsed
    } = this.state
    return (
      <div>
        <div>
          {/*{this.renderRooms()}*/}
          {/*<EventTooltip />*/}
          <div className={s.container}
            ref={(ref) => this.container = ref}>
              <div className={s.dateSwitcher}>
                <DateSwitcher />
              </div>
              <div className={s.timetable}>
                {ArrayFrom8AM.map(time => (<div>{time}</div>))}
              </div>
              <div className={s.rooms}>
                <Floor level={6} />
                <Room name='Ржавый Фред' capacity={7} />
                <Room name='Оранжевый Тюльпан' capacity={7} />
                <Room name='Ещё рума' capacity={7} />
                <Floor level={5} />
                <div>4</div>
              </div>
              <div className={s.events}>
                <div className={s.eventsArea}></div>
                <div>empty space</div>
                <div className={s.roomEvents}>
                  <TimetableEvent
                    width={50} />
                    <TimetableEvent
                    width={50} />
                    <TimetableEvent
                    width={50} />
                </div>
                <div>
                  <TimetableEvent
                    width={50} />
                </div>
                <div>
                  <TimetableEvent
                    width={50} />
                </div>
                <div>empty space</div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RoomsTimetable
