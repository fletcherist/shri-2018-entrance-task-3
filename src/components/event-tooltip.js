// @flow
import { h, Component } from 'preact'
import { TextHeadline, Text } from './text'
import User from './user'
import EditIcon from '../assets/edit.svg'
import { EmptyDivider } from './divider'
import { ending, formatTimeIntoEventTooltip } from '../utils'
import s from '../styles/event-tooltip.css'
import cx from 'classnames'

const getUsersEnding = amount =>
  ending(amount, ['участник', 'участника', 'участников'])

type Props = {
  targetElementData: Object,
  isVisible: boolean,
  event: Object,
  hideModal: Function,
  editEvent: Function
};
class EventTooltip extends Component<Props> {
  componentDidMount() {
    this.listenToClickOutside()
  }

  listenToClickOutside() {
    this.listener = document.addEventListener('click', (event) => {
      if (!this.props.isVisible) return false

      /* check for click for event-tooltip */
      if (this.eventTooltipDOM.contains(event.target)) {
        return
      } else {
        this.props.hideModal()
      }
    })
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.listener)
    this.listener = null
  }

  handleEditButtonClick() {
    this.props.editEvent()
    window.location.hash = '#/create'
  }

  renderInnerData() {
    const { event } = this.props
    if (!event.room) {
      return null
    }
    if (event.users.length === 0) return null
    return (
      <div className={cx({
        [s.wrapper]: true,
        [s.isVisible]: this.props.isVisible,
        [s.isHidden]: !this.props.isVisible
      })}>
        <div className={s.editButton} onClick={() => this.handleEditButtonClick()}>
          <img src={`dist/${EditIcon}`} />
        </div>
        <TextHeadline marginTop={8} marginBottom={8}>{event.title}</TextHeadline>
        <Text>{formatTimeIntoEventTooltip(event.dateStart, event.dateEnd)} · {event.room.title}</Text>
        <EmptyDivider height={16} />
        <div className={s.participants}>
          <User userName={event.users[0].username} userPhoto={event.users[0].avatarUrl} />
          {event.users.length - 1 > 0 && (
            <div className={s.otherParticipants}>
              <Text fontSize={13}> и {event.users.length - 1}
                {' '}{getUsersEnding(event.users.length - 1)}
              </Text>
            </div>
          )}
        </div>
      </div>
    )
  }

  render({ event }) {
    const { targetElementData } = this.props
    return (
      <div className={cx({
        [s.container]: true,
        [s.isContainerHidden]: !this.props.isVisible
      })} style={{
        transform: `translate(${
          targetElementData.x + (targetElementData.width / 2)
        }px, ${targetElementData.y - 53}px)`
      }} ref={ref => this.eventTooltipDOM = ref}>
        {this.renderInnerData()}
      </div>
    )
  }
}

export default EventTooltip
