import { h } from 'preact'
import { connect } from 'preact-fela'
import { when, gte, lt, propSatisfies, __ } from 'ramda'

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
const roomCapacityStyles = state => ({
  fontSize: '13px'
})

// gte - greater than or equal
// lt - lower than
const calculateRoomCapacity = when(
  capacity => capacity > 1 ? '2—4 человека' : null,
  capacity => capacity > 3 ? '3—6 человека' : null,
  capacity => capacity > 6 ? 'до 10 человек' : null
)

const Room = connect({
  roomContainerStyles,
  roomStyles,
  roomCapacityStyles
})(({ name, capacity, styles }) => (
  <div className={styles.roomContainerStyles}>
    <div className={styles.roomStyles}>
      {name}
    </div>
    <div className={styles.roomCapacityStyles}>
      {capacity}
      {calculateRoomCapacity(capacity)}
    </div>
  </div>
))

export default Room
