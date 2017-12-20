import { h } from 'preact'
import { connect } from 'preact-fela'
import CloseIcon from '../assets/emoji1.svg'
import { TextHeadline } from './text'
import { ButtonRemove, ButtonCancel } from './button'

const containerStyles = state => ({
  width: '100%',
})

const centerBlockStyles = state => ({
  display: 'flex',
  justifyContent: 'center',
  height: '50px'
})

const RemoveEventConfirm = ({ styles }) => (
  <div className={styles.containerStyles}>
    <div className={styles.centerBlockStyles}>
      <img src={`dist/${CloseIcon}`} style={{display: 'block'}}/>
    </div>
    <TextHeadline center>Встреча будет удалена<br /> безвозвратно</TextHeadline>
    <div className={styles.centerBlockStyles}>
      <ButtonCancel />
      <ButtonRemove />
    </div>
  </div>
)

export default connect({
  containerStyles,
  centerBlockStyles
})(RemoveEventConfirm)
