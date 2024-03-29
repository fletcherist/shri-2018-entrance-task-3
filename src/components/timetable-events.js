// @flow
import { h, Component } from 'preact'
import { connect } from 'preact-fela'
import {
  isMobile,
  transformEvents,

  getEventDurationInMinutes,
  getEventDurationInPixels,
  MINUTES_BETWEEN_8_AND_24
} from '../utils'
import { EMPTY_EVENT, REAL_EVENT } from '../actions/actionTypes'
import s from '../styles/timetable-events.css'

type timetableEventType = {
  width: number,
  isBooked: boolean,
  selected: boolean
};

const timetableEventStyles = (state: timetableEventType) => {
  const { width, isBooked, selected } = state
  return {
    position: 'relative',
    width: width ? `${width}px` : '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '28px',
    color: 'transparent',
    cursor: 'pointer',
    backgroundColor: isBooked ? 'rgba(213,223,233,1)' : 'white',
    borderRadius: (!isBooked && selected) ? '2px' : '0px',
    transition: 'background-color .1s',
    '@media (max-width: 500px) ': {
      height: '58px'
    },
    ':hover': {
      backgroundColor: isBooked ? '#99A9B9' : '#2F57F9',
      color: 'white'
    }
  }
}

type TimetableEventProps = {
  onClick: Function
};
const TimetableEvent = connect({
  timetableEventStyles
})(class extends Component<TimetableEventProps> {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    this.props.onClick(
      event, /* that is browser click event */
      this.props.event /* room event, sorry for that naming */
    )
  }

  render({ styles, selected, isBooked, event }) {
    return (
      <div className={styles.timetableEventStyles}
        onClick={this.handleClick}>
        {(!isBooked && selected) && (
          '+'
        )}
      </div>
    )
  }
})

const timetableEventsContainerStyles = state => ({
  display: 'flex'
})

type TimetableEventsProps = {
  setCurrentEvent: Function,
  handleEventTooltipModal: Function,
  eventsScrollWidth: number,
  room: Object
};

const TimetableEvents = connect({timetableEventsContainerStyles})
(class extends Component<TimetableEventsProps> {
  constructor() {
    super()
    this.handleEventClick = this.handleEventClick.bind(this)
  }
  componentDidMount() {
    // console.log('eventsScrollWidth', this.props.eventsScrollWidth)
  }

  handleEventClick(mouseEvent, roomEvent) {
    if (roomEvent.type === EMPTY_EVENT) {
      this.props.setCurrentEvent(roomEvent)
    } else if (roomEvent.type === REAL_EVENT) {
      this.props.setCurrentEvent(roomEvent)
      setTimeout(() => {
        this.props.handleEventTooltipModal(mouseEvent)
      }, 50)
    }
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
            selected={true}
            onClick={this.handleEventClick}
          />
        </div>
      )
    }
    const proccessedEvents = transformEvents(events, this.props.room)
    const eventsMarkup = proccessedEvents.map((event, index, eventsArray) => {
      const dateStart = new Date(event.dateStart)
      const dateEnd = new Date(event.dateEnd)

      const eventDuration = getEventDurationInMinutes(dateStart, dateEnd)
      const durationInPixels =
        getEventDurationInPixels(eventDuration, this.props.eventsScrollWidth)

      return (
        <TimetableEvent
          width={durationInPixels}
          isBooked={event.type === REAL_EVENT}
          selected={true}
          type={event.type}
          event={event}
          onClick={this.handleEventClick}
        />
      )
    })

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
