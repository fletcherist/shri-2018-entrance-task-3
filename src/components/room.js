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
const Room = connect({
  roomContainerStyles,
  roomStyles,
  roomCapacityStyles
})(({ name, capacity, styles }) => (
  <div className={styles.roomContainerStyles}>
    <div className={styles.roomStyles}>
      {name}
    </div>
    <div className={styles.roomCapacityStyles}>3—6 человек</div>
  </div>
))

export default Room
