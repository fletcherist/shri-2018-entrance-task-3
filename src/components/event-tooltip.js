import { h } from 'preact'
import { connect } from 'preact-fela'
import { TextHeadline, Text } from './text'
import User from './user'
import EditIcon from '../assets/edit.svg'
import { EmptyDivider } from './divider'
import { ending, formatTimeIntoEventTooltip } from '../utils'

const rule = state => ({
  background: 'white',
  minWidth: '360px',
  maxWidth: '360px',
  position: 'relative',
  boxShadow: '0 1px 16px 0 rgba(0,44,92,0.28)',
  padding: '10px 16px',
  zIndex: '9999',
  borderRadius: '8px',
  marginTop: '180px',
  '::after': {
    content: '""',
    position: 'absolute',
    top: '-20px',
    left: '61.8%', // Golden rule damn it
    border: '10px solid white',
    borderColor: 'transparent transparent white transparent'
  }
})

const editIconRule = state => ({
  // padding: '10px',
})

const editButtonRule = state => ({
  backgroundColor: '#E9ECEF',
  height: '24px',
  width: '24px',
  borderRadius: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  position: 'absolute',
  top: '16px',
  right: '16px'
})

const participantsRule = state => ({
  display: 'flex',
  alignItems: 'center',
  flexBasis: '30px'
})

const otherParticipantsRule = state => ({
  marginLeft: '6px',
  color: '#858E98'
})

const getUsersEnding = amount =>
  ending(amount, ['участник', 'участника', 'участников'])

const EventTooltip = ({
  styles,
  event
}) => (
  <div className={styles.rule}>
    <div className={styles.editButtonRule}>
      <img className={styles.editIconRule} src={`dist/${EditIcon}`} />
    </div>
    <TextHeadline marginTop={8} marginBottom={8}>{event.title}</TextHeadline>
    <Text>{formatTimeIntoEventTooltip(event.dateStart, event.dateEnd)} · {event.room.title}</Text>
    <EmptyDivider height={16} />
    <div className={styles.participantsRule}>
      <User userName={event.users[0].username} userPhoto={event.users[0].avatarUrl} />
      {
        <div className={styles.otherParticipantsRule}>
          <Text> и {event.users.length - 1}
            {' '}{getUsersEnding(event.users.length - 1)}
          </Text>
        </div>
      }
    </div>
  </div>
)

export default connect({
  rule,
  editButtonRule,
  editIconRule,
  participantsRule,
  otherParticipantsRule
})(EventTooltip)
