import { h, Component } from 'preact'
import Divider from './divider'
import { connect } from 'preact-fela'

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
    overflow: 'scroll',
  },
  element: {
    minWidth: '49px',
    marginLeft: '28px',
    padding: '9px 0px 10px 0',
    textAlign: 'center',
    fontSize: '11px',
    color: '#858E98',
    letterSpacing: '0.4px',
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

const sRoomName = {
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
}

const RoomName = ({children}) => (
  <div style={sRoomName}>{children}</div>
)

const RoomNameBlock = (props) => (
  <div style={{marginLeft: '14px'}}>
    <RoomName {...props}></RoomName>
  </div>
)

// background: #D5DFE9;

const sEvents = {
  height: '58px',
  minWidth: '300px',
  backgroundColor: 'rgba(213,223,233,.7)'
}

const Floor = ({ level }) => (
  <div style={{
    fontSize: '11px',
    color: '#858E98',
    letterSpacing: '0.4px',
    padding: '16px 16px 8px',
    background: 'rgba(233,236,239,.6)',
    zIndex: '-1'
  }}><b>{level} ЭТАЖ</b></div>
)

const TimetableEvent = () => (
  <div style={{display: 'flex'}}>
    <div style={{width: '20px', height: '58px', background: 'rgba(213,223,233,1)'}}></div>
    <div style={{width: '100px', height: '58px', background: 'rgba(213,223,233,0)'}}></div>
    <div style={{width: '200px', height: '58px', background: 'rgba(213,223,233,1)'}}></div>
  </div>
)

class RoomsTimetable extends Component {
  constructor() {
    super()
    this.handleScroll = this.handleScroll.bind(this)
  }
  handleScroll(event) {
    window.requestAnimationFrame(() => {
      this.blocks.style.transform = `translate(${-this.container.scrollLeft}px, 0px)`
    })
  }
  render() {
    return (
      <div style={{position: 'relative', overflow: 'hidden'}}>
        {/*<div style={{position: 'absolute', marginTop: '32px'}}>
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
        </div>*/}
        <div style={{overflow: 'scroll',position: 'absolute', zIndex: '-1'}}
          ref={(ref) => this.blocks = ref}>
          <TimetableEvent />
          <div style={{display: 'flex'}}>
            <div style={{width: '200px', height: '58px', background: 'rgba(213,223,233,1)'}}></div>
            <div style={{width: '100px', height: '58px', background: 'rgba(213,223,233,0)'}}></div>
            <div style={{width: '200px', height: '58px', background: 'rgba(213,223,233,1)'}}></div>
          </div>
        </div>
        <div style={sTime.container} onScroll={this.handleScroll}
          ref={(ref) => this.container = ref}>
          {ArrayFrom8AM.map(hour => (
            <div>
              <div style={sTime.element}>{hour}</div>
              <div style={sTime.line}></div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default RoomsTimetable
