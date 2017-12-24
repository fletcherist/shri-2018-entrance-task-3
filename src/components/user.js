import { h } from 'preact'
import { connect } from 'preact-fela'
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
    {homeFloor && (
      <div className={s.homeFloorContainer}>
        <span> · </span>
        <span className={s.homeFloor}>
          {homeFloor} этаж
        </span>
      </div>
    )}
  </div>
)

export default connect({
})(User)
