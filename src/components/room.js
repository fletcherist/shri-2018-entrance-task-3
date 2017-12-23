import { h } from 'preact'
import { connect } from 'preact-fela'

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

const calculateRoomCapacity = capacity => {
  if (capacity >= 1) return '1-2 человека'
  if (capacity >= 4) return '2—4 человека'
  if (capacity >= 6) return '3-6 человек'
  if (capacity >= 8) return '6-8 человек'
  if (capacity === 10) return 'до 10 человек'
  return `10 и более человек`
}

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
      {calculateRoomCapacity(capacity)}
    </div>
  </div>
))

export default Room
