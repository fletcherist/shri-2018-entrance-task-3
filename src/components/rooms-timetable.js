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
    overflow: 'scroll'
  },
  element: {
    minWidth: '49px',
    marginRight: '17px',
    padding: '9px 0px 10px 0',
    textAlign: 'center',
    fontSize: '11px',
    color: '#858E98',
    letterSpacing: '0.4px'
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
  position: 'absolute'
}

const RoomName = ({children}) => (
  <div style={sRoomName}>{children}</div>
)

const RoomNameBlock = (props) => (
  <div style={{marginLeft: '14px'}}>
    <RoomName {...props}></RoomName>
  </div>
)

const sEvents = {
  height: '58px',

}

class RoomsTimetable extends Component {
  render() {
    return (
      <div>
        <div style={sTime.container}>
          {ArrayFrom8AM.map(hour => (
            <div style={sTime.element}>{hour}</div>
          ))}
        </div>
        <div>7 ЭТАЖ</div>
        <div style={sEvents}>
          <RoomNameBlock>Ржавый Фред</RoomNameBlock>
        </div>
        <div style={sEvents}>
          <RoomNameBlock>Прачечная</RoomNameBlock>
        </div>

        <Divider />
      </div>
    )
  }
}

export default RoomsTimetable
