// @flow
import { h } from 'preact'
import { connect } from 'preact-fela'
import { isMobile } from '../utils'

type timetableEventType = {
  width: number,
  isBooked: boolean,
  selected: boolean
};

const IS_MOBILE = isMobile()

const timetableEventStyles = (state: timetableEventType) => {
  const { width, isBooked, selected } = state
  return {
    width: width ? `${width}px` : '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: IS_MOBILE ? '58px' : '28px',
    backgroundColor: isBooked
      ? selected ? '#99A9B9' : 'rgba(213,223,233,1)'
      : selected ? '#2B50FD' : 'white',
    borderRadius: (!isBooked && selected) ? '2px' : '0px'
  }
}

const TimetableEvent = connect({
  timetableEventStyles
})(({ styles, selected, isBooked }) => (
  <div className={styles.timetableEventStyles}>
    {(!isBooked && selected) && (
      <div>+</div>
    )}
  </div>
))

const timetableEventsContainerStyles = state => ({
  display: 'flex',
  marginLeft: '180px'
})
const TimetableEvents = connect({
  timetableEventsContainerStyles
})(({ styles, events }) => {
  return (
    <div className={styles.timetableEventsContainerStyles}>
      <TimetableEvent width={100} isBooked selected/>
      <TimetableEvent width={100} selected/>
      <TimetableEvent width={100} isBooked />
    </div>
  )
})

export { TimetableEvent, TimetableEvents }
export default TimetableEvents
