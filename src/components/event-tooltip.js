import { h } from 'preact'
import { connect } from 'preact-fela'
import { TextHeadline } from './text'
import User from './user'

const rule = state => ({
  maxWidth: '360px',
  boxShadow: '0 1px 16px 0 rgba(0,44,92,0.28);'
})

const EventTooltip = ({
  styles
}) => (
  <div className={styles.rule}>
    <TextHeadline>Рассуждения о высоком</TextHeadline>
    14 декабря, 15:00—17:00  · Ржавый Фред
    <User userName='Дарт Вейдер' />
  </div>
)

export default connect({rule})(EventTooltip)