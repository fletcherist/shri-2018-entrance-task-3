import { h } from 'preact'
import { connect } from 'preact-fela'

const modalContainerStyles = state => ({
  position: 'absolute',
  backgroundColor: 'rgba(0,16,33,0.80)',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
})

const modalWrapperStyles = state => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
})

const modalWindowStyles = state => ({
  maxWidth: '320px',
  padding: '32px 62px',
  width: '100%',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 1px 16px 0 rgba(0,44,92,0.28)'
})

const Modal = ({ styles, children }) => (
  <div className={styles.modalContainerStyles}>
    <div className={styles.modalWrapperStyles}>
      <div className={styles.modalWindowStyles}>
        {children}
      </div>
    </div>
  </div>
)

export default connect({
  modalContainerStyles,
  modalWrapperStyles,
  modalWindowStyles
})(Modal)
