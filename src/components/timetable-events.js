// @flow
import { h, Component } from 'preact'
import { connect } from 'preact-fela'
import {
  isMobile,
  transformEvents,

  getEventDurationInMinutes,
  getEventDurationInPixels,
  MINUTES_BETWEEN_8_AND_24,
} from '../utils'
import { EMPTY_EVENT, REAL_EVENT } from '../actions/actionTypes'
import EventTooltip from './event-tooltip'

type timetableEventType = {
  width: number,
  isBooked: boolean,
  selected: boolean
};

const IS_MOBILE = isMobile()

const timetableEventStyles = (state: timetableEventType) => {
  const { width, isBooked, selected } = state
  return {
    cursor: isBooked ? 'pointer' : null,
    width: width ? `${width}px` : '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '28px',
    backgroundColor: isBooked
      ? selected ? '#99A9B9' : 'rgba(213,223,233,1)'
      : selected ? '#2F57F9' : 'white',
    borderRadius: (!isBooked && selected) ? '2px' : '0px',
    '@media (max-width: 500px) ': {
      height: '58px'
    }
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
    this.openTooltip = this.openTooltip.bind(this)
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
        <EventTooltip event={this.props.event} />
      )
    }
  }

  handleEventClick(event) {
    console.log(event)
  }

  render({ styles, selected, isBooked, event }) {
    return (
      <div className={styles.timetableEventStyles}
        onClick={this.openTooltip}>
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
  // paddingLeft: '14px',
  maxWidth: '1120px'
})

const TimetableEvents = connect({timetableEventsContainerStyles})
(class extends Component {
  componentDidMount() {
    // console.log('eventsScrollWidth', this.props.eventsScrollWidth)
  }
  render({ styles, events }) {
    // console.log('events', events)
    const durationInPixels =
        getEventDurationInPixels(MINUTES_BETWEEN_8_AND_24,
          this.props.eventsScrollWidth)
    if (!events) {
      return (
        <div className={styles.timetableEventsContainerStyles}
          ref={(ref) => this.container = ref}>
          <TimetableEvent
            width={durationInPixels}
            isBooked={false}
            selected={false}
          />
        </div>
      )
    }
    const proccessedEvents = transformEvents(events)
    const eventsMarkup = proccessedEvents.map((event, index, eventsArray) => {
      const dateStart = new Date(event.dateStart)
      const dateEnd = new Date(event.dateEnd)

      const eventDuration = getEventDurationInMinutes(dateStart, dateEnd)
      const durationInPixels =
        getEventDurationInPixels(eventDuration, this.props.eventsScrollWidth)
      
      console.log('room id', event.room)
      console.log('eventDuration', eventDuration)
      console.log('from', dateStart.getHours(), dateStart.getMinutes())
      console.log('till', dateEnd.getHours(), dateEnd.getMinutes())
      return (
        <TimetableEvent
          width={durationInPixels}
          isBooked={event.type === REAL_EVENT}
          selected={false}
          type={event.type}
          event={event}
        />
      )
    })
    console.log(proccessedEvents)
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
