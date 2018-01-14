import { h } from 'preact'
import { connect } from 'preact-fela'
import CloseIcon from '../assets/emoji1.svg'
import { TextHeadline } from './text'
import { ButtonRemove, ButtonCancel } from './button'
import { HorizontalDivider } from './divider'

const containerStyles = state => ({
  width: '100%'
})

const centerBlockStyles = state => ({
  display: 'flex',
  justifyContent: 'center',
  height: '50px'
})

const RemoveEventConfirm = ({ styles, removeEvent, hideModalEvent }) => (
  <div className={styles.containerStyles}>
    <div className={styles.centerBlockStyles}>
      <img src={`dist/${CloseIcon}`} style={{display: 'block'}}/>
    </div>
    <TextHeadline center marginBottom={24}>
      Встреча будет удалена<br /> безвозвратно
    </TextHeadline>
    <div className={styles.centerBlockStyles}>
      <ButtonCancel onClick={hideModalEvent} />
      <HorizontalDivider width={16} />
      <ButtonRemove onClick={removeEvent} />
    </div>
  </div>
)

export default connect({
  containerStyles,
  centerBlockStyles
})(RemoveEventConfirm)
