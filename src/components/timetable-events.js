import { h } from 'preact'
import { connect } from 'preact-fela'

const timetableEventStyles = state => {
  const { width, isBooked } = state
  return {
    width: width ? `${width}px` : '20px',
    height: '58px',
    background: isBooked ? 'rgba(213,223,233,1)' : 'white'
  }
}

const TimetableEvent = connect({
  timetableEventStyles
})(({ styles }) => (
  <div className={styles.timetableEventStyles}></div>
))

const timetableEventsContainerStyles = state => ({
  display: 'flex',
  marginLeft: '180px'
})
const TimetableEvents = connect({
  timetableEventsContainerStyles
})(({ styles }) => (
  <div className={styles.timetableEventsContainerStyles}>
    <TimetableEvent width={100} isBooked />
    <TimetableEvent width={100} />
    <TimetableEvent width={100} isBooked />
  </div>
))

export { TimetableEvent, TimetableEvents }
export default TimetableEvents
