import { connect } from 'preact-redux'
import EventTooltip from '../components/event-tooltip'
import { hideModal } from '../actions/modals'

import { setBookingRoomType } from '../actions/app'
import {
  BOOKING_ROOM_TYPE_EDITING
} from '../actions/actionTypes'

const mapStateToProps = state => {
  const currentEvent = state.app.currentEvent
  return {
    event: currentEvent,
    isVisible: state.modals.EventTooltip.isVisible,
    targetElementData: state.modals.EventTooltip.data
  }
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal('EventTooltip')),
  editEvent: () => dispatch(setBookingRoomType(BOOKING_ROOM_TYPE_EDITING))
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(EventTooltip)
