import { h } from 'preact'
import { connect } from 'preact-fela'
import CloseIcon from '../assets/emoji2.svg'
import { TextHeadline, Text, TextBlock } from './text'
import { ButtonOkay } from './button'
import { HorizontalDivider, EmptyDivider } from './divider'

const containerStyles = state => ({
  width: '100%'
})

const centerBlockStyles = state => ({
  display: 'flex',
  justifyContent: 'center',
  height: '50px'
})

const RemoveEventConfirm = ({
  styles,
  showModalEvent,
  hideModalEvent
}) => (
  <div className={styles.containerStyles}>
    <div className={styles.centerBlockStyles}>
      <img src={`dist/${CloseIcon}`} style={{display: 'block'}}/>
    </div>
    <TextHeadline center>
      Встреча создана!
    </TextHeadline>
    <TextBlock center>14 декабря, 15:00—17:00</TextBlock>
    <TextBlock center>Готем · 4 этаж</TextBlock>
    <EmptyDivider height={31} />
    <div className={styles.centerBlockStyles}>
      <HorizontalDivider width={16} />
      <ButtonOkay onClick={hideModalEvent} />
    </div>
  </div>
)

export default connect({
  containerStyles,
  centerBlockStyles
})(RemoveEventConfirm)
