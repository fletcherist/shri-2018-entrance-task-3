// @flow
import { h, Component } from 'preact'
import { connect } from 'preact-fela'
import { isMobile, transformEvents } from '../utils'
import { EMPTY_EVENT, REAL_EVENT } from '../actions/actionTypes'
import EventTooltip from './event-tooltip'

type timetableEventType = {
  width: number,
  isBooked: boolean,
  selected: boolean
};

const IS_MOBILE = isMobile()
const MINUTES_BETWEEN_8_AND_24 = 960

const getEventDurationInMinutes =
  (startTime, endTime) => (endTime - startTime) / 1000 / 60

const timetableEventStyles = (state: timetableEventType) => {
  const { width, isBooked, selected } = state
  return {
    cursor: isBooked ? 'pointer' : null,
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
})(class extends Component {
  constructor() {
    super()
    this.state = {
      isTooltipOpened: false
    }
    this.handleEventClick = this.handleEventClick.bind(this)
  }

  openTooltip() {
    this.setState({
      isTooltipOpened: true
    })
  }

  renderTooltip() {
    if (this.props.type === EMPTY_EVENT)
      return null
    if (this.state.isTooltipOpened) {
      return (
        <EventTooltip />
      )
    }
  }

  handleEventClick(event) {
    console.log(event)
  }

  render({ styles, selected, isBooked }) {
    return (
      <div className={styles.timetableEventStyles}
        onClick={this.handleEventClick}>
        {(!isBooked && selected) && (
          <div>+</div>
        )}
        {this.renderTooltip()}
      </div>
    )
  }
})

const timetableEventsContainerStyles = state => ({
  display: 'flex',
  marginLeft: '52px'
})

const TimetableEvents = connect({timetableEventsContainerStyles})
(class extends Component {
  componentDidMount() {
    // console.log('eventsScrollWidth', this.props.eventsScrollWidth)
  }
  render({ styles, events }) {
    // console.log('events', events)
    if (!events) {
      return (
        <div className={styles.timetableEventsContainerStyles}
          ref={(ref) => this.container = ref}>
        </div>
      )
    }
    const proccessedEvents = transformEvents(events)
    const eventsMarkup = proccessedEvents.map((event, index, eventsArray) => {
      const dateStart = new Date(event.dateStart)
      const dateEnd = new Date(event.dateEnd)

      const eventDuration = getEventDurationInMinutes(dateStart, dateEnd)
      const durationInPixels =
        eventDuration * this.props.eventsScrollWidth / MINUTES_BETWEEN_8_AND_24
      
      // console.log('eventDuration', eventDuration)
      // console.log('from', dateStart.getDate(), dateStart.getHours(), dateStart.getMinutes())
      // console.log('till', dateEnd.getDate(), dateEnd.getHours(), dateEnd.getMinutes())
      return (
        <TimetableEvent width={durationInPixels}
          isBooked={event.type === REAL_EVENT}
          selected={false}
          type={event.type}
        />
      )
    })
    // console.log(proccessedEvents)
    return (
      <div className={styles.timetableEventsContainerStyles}
        ref={(ref) => this.container = ref}>
        {eventsMarkup}
      </div>
    )
  }
})

export { TimetableEvent, TimetableEvents }
export default TimetableEvents
