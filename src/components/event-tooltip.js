import { h } from 'preact'
import { connect } from 'preact-fela'
import { TextHeadline, Text } from './text'
import User from './user'
import EditIcon from '../assets/edit.svg'
import { EmptyDivider } from './divider'

const rule = state => ({
  maxWidth: '360px',
  boxShadow: '0 1px 16px 0 rgba(0,44,92,0.28);',
  padding: '10px 16px',
  zIndex: '9999',
  position: 'relative',
  borderRadius: '8px',
  ':after': {
    content: ' ',
    backgroundColor: 'blue',
    width: '10px',
    height: '10px',
  }
})

const editIconRule = state => ({
  // padding: '10px',
})

const editButtonRule = state => ({
  backgroundColor: '#E9ECEF',
  height: '32px',
  width: '32px',
  borderRadius: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  position: 'absolute',
  right: '16px'
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
    <User userName='Дарт Вейдер' userPhoto={'https://1ofdmq2n8tc36m6i46scovo2e-wpengine.netdna-ssl.com/wp-content/uploads/2014/04/Steven_Hallam-slide.jpg'} />
  </div>
)

export default connect({
  rule,
  editButtonRule,
  editIconRule
})(EventTooltip)