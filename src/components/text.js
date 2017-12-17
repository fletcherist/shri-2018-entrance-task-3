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
const WrappedTextLabel = connect({labelRule})(TextLabel)

const TextHeadline = ({ children, size }) => (
  <h1 style={{fontSize: size ? `${size}px` : '20px'}}>{children}</h1>
)

export { WrappedTextLabel as TextLabel }
export { TextHeadline }

export default connect({labelRule})(TextLabel)
