import { h } from 'preact'
import { connect } from 'preact-fela'

const roomNameStyles = state => ({
  borderRadius: '4px',
  boxShadow: '0 1px 8px 0 rgba(0,44,92,0.28)',
  padding: '5px 8px 6px 8px',
  fontWeight: 'bold',
  fontSize: '11px',
  color: '#858E98',
  letterSpacing: '0.4px',
  display: 'inline-block'
  // minWidth: '80px'
})
const RoomName = connect({
  roomNameStyles
})(({ children, styles, name }) => (
  <div className={styles.roomNameStyles}>{name}</div>
))

export const RoomNameBlock = (props) => (
  <div style={{marginLeft: '14px'}}>
    <RoomName {...props}></RoomName>
  </div>
)

export default RoomNameBlock
