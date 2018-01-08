import { h, Component } from 'preact'
import { TextHeadline, Text } from './text'
import User from './user'
import EditIcon from '../assets/edit.svg'
import { EmptyDivider } from './divider'
import { ending, formatTimeIntoEventTooltip } from '../utils'
import s from '../styles/event-tooltip.css'

const getUsersEnding = amount =>
  ending(amount, ['участник', 'участника', 'участников'])

class EventTooltip extends Component {
  render({ event }) {
    console.log('eventToo', event)
    if (!event.room) {
      console.error('eventTooltip: not enough data')
      return null
    }
    return (
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.editButton}>
            <img src={`dist/${EditIcon}`} />
          </div>
          <TextHeadline marginTop={8} marginBottom={8}>{event.title}</TextHeadline>
          <Text>{formatTimeIntoEventTooltip(event.dateStart, event.dateEnd)} · {event.room.title}</Text>
          <EmptyDivider height={16} />
          <div className={s.participants}>
            <User userName={event.users[0].username} userPhoto={event.users[0].avatarUrl} />
            {event.users.length - 1 > 0 && (
              <div className={s.otherParticipants}>
                <Text fontSize={13}> и {event.users.length - 1}
                  {' '}{getUsersEnding(event.users.length - 1)}
                </Text>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default EventTooltip
