import { h, Component } from 'preact'
import Divider from './divider'
import { connect } from 'preact-fela'
import EventTooltip from './event-tooltip'
import Room from './room'
import RoomCollapsed from './room-collapsed'
import TimetableEvents from './timetable-events'

import RemoveEventConfirm from './remove-event-confirm'
import CreateEventConfirm from '../containers/create-event-confirm'
import Modal from './modal'

const ArrayFrom8AM = (() => {
  const array = []
  array.push('8:00')
  for (let i = 9; i <= 23; i++) array.push(i.toString())
  return array
})()

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
  zIndex: '-999'
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
})(({ styles }) => (
  <div className={styles.roomWithEventsStyles}>
    <Room name='Ржавый Фред' />
    <TimetableEvents />
  </div>
))

class RoomsTimetable extends Component {
  constructor() {
    super()
    this.handleScroll = this.handleScroll.bind(this)
    this.state = {
      isRoomsCollapsed: false
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

  render() {
    const {
      isRoomsCollapsed
    } = this.state
    return (
      <div>
        <div style={{position: 'relative', overflow: 'hidden' }}>
          <div style={{position: 'absolute', zIndex: '-1', top: '30px', backgroundColor: 'grey'}}
            ref={(ref) => this.blocks = ref}>
            <div>
              <Floor level={7} />
            </div>
            <RoomWithEvents />
            <RoomWithEvents />
          </div>
          <div>
            {isRoomsCollapsed ? (
              <div style={{position: 'absolute', marginTop: '10px', overflow: 'hidden'}}>
                <Floor level={7} />
                <div style={sEvents}>
                  <RoomCollapsed>Ржавый Фред</RoomCollapsed>
                </div>
                <div style={sEvents}>
                  <RoomCollapsed>Прачечная</RoomCollapsed>
                </div>
                <Floor level={6} />
                <div style={sEvents}>
                  <RoomCollapsed>Ржавый Фред</RoomCollapsed>
                </div>
                <div style={sEvents}>
                  <RoomCollapsed>Прачечная</RoomCollapsed>
                </div>
              </div>
            ) : null}
          </div>
          {/*<EventTooltip />*/}
          <div style={sTime.container} onScroll={this.handleScroll}
            ref={(ref) => this.container = ref}>
            {ArrayFrom8AM.map((hour, index) => (
              <div>
                <div style={sTime.element}>{hour}</div>
                {(index > 0) && (<div style={sTime.line}></div>)}
              </div>
            ))}
          </div>
        </div>
        <CreateEventConfirm />
      </div>
    )
  }
}

// <Modal>
//   <CreateEventConfirm />
// </Modal>
// 
// <Modal>
//   <CreateEventConfirm />
// </Modal>

export default RoomsTimetable
