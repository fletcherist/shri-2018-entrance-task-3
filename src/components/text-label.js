import { h } from 'preact'
import { connect } from 'preact-fela'

const labelRule = state => ({
  fontSize: '13px',
  fontWeight: 'bold',
  paddingBottom: '4px'
})

const TextLabel = ({ children, styles }) => (
  <div className={styles.labelRule}>{children}</div>
)

export default connect({labelRule})(TextLabel)
