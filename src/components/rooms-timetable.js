import { h, Component } from 'preact'
import Divider from './divider'
import { connect } from 'preact-fela'
import EventTooltip from './event-tooltip'

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

const roomNameStyles = state => ({
  borderRadius: '4px',
  boxShadow: '0 1px 8px 0 rgba(0,44,92,0.28)',
  padding: '5px 8px 6px 8px',
  fontWeight: 'bold',
  fontSize: '11px',
  color: '#858E98',
  display: 'block',
  position: 'absolute',
  letterSpacing: '0.4px'
  // minWidth: '80px'
})
const RoomName = connect({
  roomNameStyles
})(({ children, styles }) => (
  <div className={styles.roomNameStyles}>{children}</div>
))

const RoomNameBlock = (props) => (
  <div style={{marginLeft: '14px'}}>
    <RoomName {...props}></RoomName>
  </div>
)

// background: #D5DFE9;

const sEvents = {
  height: '58px',
  minWidth: '300px',
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

const TimetableEvent = () => (
  <div style={{display: 'flex', marginLeft: '180px'}}>
    <div style={{width: '20px', height: '58px', background: 'rgba(213,223,233,1)'}}></div>
    <div style={{width: '100px', height: '58px', background: 'rgba(213,223,233,0)'}}></div>
    <div style={{width: '200px', height: '58px', background: 'rgba(213,223,233,1)'}}></div>
  </div>
)

const roomContainerStyles = state => ({
  padding: '12px 16px 12px 25px',
  backgroundColor: 'transparent',
  lineHeight: '17px'
})
const roomStyles = state => ({
  width: '140px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: '15px',
  fontFamily: 'HelveticaNeue-Medium'
})
const Room = connect({
  roomContainerStyles,
  roomStyles
})(({ name, capacity, styles }) => (
  <div className={styles.roomContainerStyles}>
    <div className={styles.roomStyles}>
      {name}
    </div>
    <div style={{
      fontSize: '13px'
    }}>3—6 человек</div>
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
        <div style={{position: 'relative', overflow: 'hidden', zIndex: -1 }}>
          <div style={{position: 'absolute', zIndex: '-1', top: '30px', backgroundColor: 'grey'}}
            ref={(ref) => this.blocks = ref}>
            <div>
              <Floor level={7} />
            </div>
            <div style={{display: 'flex', borderBottom: '1px solid #E9ECEF', backgroundColor: 'white'}}>
              <Room name='Ржавый Фред' />
              <TimetableEvent />
            </div>
            <div style={{display: 'flex', borderBottom: '1px solid #E9ECEF', backgroundColor: 'white'}}>
              <Room name='Оранжевый Тюльпан' />
              <TimetableEvent />
            </div>
          </div>
          <div>
            {isRoomsCollapsed ? (
              <div style={{position: 'absolute', marginTop: '10px', overflow: 'hidden'}}>
                <Floor level={7} />
                <div style={sEvents}>
                  <RoomNameBlock>Ржавый Фред</RoomNameBlock>
                </div>
                <div style={sEvents}>
                  <RoomNameBlock>Прачечная</RoomNameBlock>
                </div>
                <Floor level={6} />
                <div style={sEvents}>
                  <RoomNameBlock>Ржавый Фред</RoomNameBlock>
                </div>
                <div style={sEvents}>
                  <RoomNameBlock>Прачечная</RoomNameBlock>
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
      </div>
    )
  }
}

export default RoomsTimetable
