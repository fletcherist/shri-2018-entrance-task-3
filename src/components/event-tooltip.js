import { h } from 'preact'
import { connect } from 'preact-fela'
import { TextHeadline, Text } from './text'
import User from './user'
import EditIcon from '../assets/edit.svg'
import { EmptyDivider } from './divider'

const rule = state => ({
  maxWidth: '360px',
  position: 'relative',
  boxShadow: '0 1px 16px 0 rgba(0,44,92,0.28)',
  padding: '10px 16px',
  zIndex: '9999',
  borderRadius: '8px',
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

const EventTooltip = ({
  styles
}) => (
  <div className={styles.rule}>
    <div className={styles.editButtonRule}>
      <img className={styles.editIconRule} src={`dist/${EditIcon}`} />
    </div>
    <TextHeadline marginTop={8} marginBottom={8}>Рассуждения о высоком</TextHeadline>
    <Text>14 декабря, 15:00—17:00  · Ржавый Фред</Text>
    <EmptyDivider height={16} />
    <div className={styles.participantsRule}>
      <User userName='Дарт Вейдер' userPhoto={'https://1ofdmq2n8tc36m6i46scovo2e-wpengine.netdna-ssl.com/wp-content/uploads/2014/04/Steven_Hallam-slide.jpg'} />
      <div className={styles.otherParticipantsRule}>
        <Text> и 12 участников</Text>
      </div>
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
