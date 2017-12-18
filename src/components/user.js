import { h } from 'preact'
import { connect } from 'preact-fela'

const rule = state => ({
  display: 'flex',
})

const User = ({
  styles,
  userName,
  userPhoto
}) => (
  <div className={styles.rule}>
    <div>a</div>
    <div>{userName}</div>
  </div>
)

export default connect({rule})(User)