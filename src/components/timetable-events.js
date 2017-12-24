// @flow
import { h, Component } from 'preact'
import { connect } from 'preact-fela'
import { isMobile } from '../utils'

type timetableEventType = {
  width: number,
  isBooked: boolean,
  selected: boolean
};

const EVENT_TYPES = Object.freeze({
  EMPTY_EVENT: 'EMPTY_EVENT',
  REAL_EVENT: 'REAL_EVENT'
})

const IS_MOBILE = isMobile()
const MINUTES_BETWEEN_8_AND_24 = 960

const getEventDurationInMinutes =
  (startTime, endTime) => (endTime - startTime) / 1000 / 60

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
      : selected ? '#2F57F9' : 'white',
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
  marginLeft: '52px'
})

const TimetableEvents = connect({timetableEventsContainerStyles})
(class extends Component {
  componentDidMount() {
    console.log('eventsScrollWidth', this.props.eventsScrollWidth)
  }
  render({ styles, events }) {
    // console.log('events', events)
    if (!events) {
      return (<TimetableEvent width={100} />)
    }
    console.log(events)
    const proccessedEvents = []
    events.forEach((event, index, eventsArray) => {
      const dateStart = new Date(event.dateStart)
      const dateEnd = new Date(event.dateEnd)

      const eventDuration = getEventDurationInMinutes(dateStart, dateEnd)
      const durationInPixels =
        eventDuration * this.props.eventsScrollWidth / MINUTES_BETWEEN_8_AND_24
        
      if (index === 0) {
        
      }
      
      console.log('eventDuration', eventDuration)

      console.log('from', dateStart.getDate(), dateStart.getHours(), dateStart.getMinutes())
      console.log('till', dateEnd.getDate(), dateEnd.getHours(), dateEnd.getMinutes())
      return (
        <TimetableEvent width={durationInPixels} isBooked selected />
      )
    })
    console.log(proccessedEvents)
    return (
      <div className={styles.timetableEventsContainerStyles}
        ref={(ref) => this.container = ref}>
        
      </div>
    )
  }
})

export { TimetableEvent, TimetableEvents }
export default TimetableEvents
