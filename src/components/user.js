import { h } from 'preact'
import { connect } from 'preact-fela'

const rule = state => ({
  display: 'flex',
  alignItems: 'center'
})

const imageRule = state => ({
  height: '32px',
  width: '32px',
  borderRadius: '32px'
})

const usernameRule = state => ({
  paddingLeft: '8px',
  fontSize: '15px'
})

const User = ({
  styles,
  userName,
  userPhoto
}) => (
  <div className={styles.rule}>
    <div>
      <img className={styles.imageRule} src={userPhoto} />
    </div>
    <div className={styles.usernameRule}>{userName}</div>
  </div>
)

export default connect({
  rule,
  imageRule,
  usernameRule
})(User)
