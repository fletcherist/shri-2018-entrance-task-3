import { h } from 'preact'
import { connect } from 'preact-fela'
import cx from 'classnames'
import CloseIcon from '../assets/close.svg'
import s from './user.css'

const User = ({
  styles,
  userName,
  userPhoto,
  homeFloor,
  onClick,
  id
}) => (
  <div className={s.container} onClick={(event) => onClick(event, id)}>
    <div>
      <img className={s.image} src={userPhoto} />
    </div>
    <div className={s.username}>{userName}</div>
  </div>
)

export const UserSelect = (props) => (
  <div className={cx(s.container, s.containerSelect)}>
    <User {...props} />
    {props.homeFloor && (
      <div className={s.homeFloorContainer}>
        <span> · </span>
        <span className={s.homeFloor}>
          {props.homeFloor} этаж
        </span>
      </div>
    )}
  </div>
)

export const UserParticipant = (props) => (
  <div className={s.containerParticipant}>
    <User {...props} />
    <div className={s.closeButton}
      onClick={(event) => props.onCloseButtonClick(event, props.id) }>
      <img src={`dist/${CloseIcon}`} />
    </div>
  </div>
)

export default connect({
})(User)
