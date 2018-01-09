import { connect } from 'preact-redux'
import EventTooltip from '../components/event-tooltip'
import { hideModal } from '../actions/modals'

const mapStateToProps = state => {
  const currentEvent = state.app.currentEvent
  return {
    event: currentEvent,
    isVisible: state.modals.EventTooltip.isVisible,
    targetElementData: state.modals.EventTooltip.data
  }
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal('EventTooltip'))
  // createEvent: input => dispatch(createEvent(input))
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(EventTooltip)
