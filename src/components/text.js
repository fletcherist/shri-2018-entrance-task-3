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

const TextHeadline = ({
  children, size, marginTop, marginBottom, center
}) => (
  <h1 style={{
    fontSize: size ? `${size}px` : '20px',
    marginTop: marginTop ? `${marginTop}px` : '13px',
    marginBottom: marginBottom ? `${marginBottom}px` : '13px',
    textAlign: center ? 'center' : null
  }}>{children}</h1>
)

const Text = ({ fontSize, children, center }) => (
  <span style={{
    fontSize: fontSize || 15,
    textAlign: center ? 'center' : null
  }}>{children}</span>
)

const TextBlock = (props) => (
  <div style={{
    textAlign: props.center ? 'center' : null,
    marginTop: '5.4px'
  }}>
    <Text {...props} />
  </div>
)

export { WrappedTextLabel as TextLabel }
export { TextHeadline }
export { Text, TextBlock }

export default connect({labelRule})(TextLabel)
