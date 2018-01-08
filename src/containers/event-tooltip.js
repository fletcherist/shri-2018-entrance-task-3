import { connect } from 'preact-redux'
import EventTooltip from '../components/event-tooltip'

const mapStateToProps = state => {
  const currentEvent = state.app.currentEvent
  return {
    event: currentEvent
  }
}

const mapDispatchToProps = dispatch => ({
  // createEvent: input => dispatch(createEvent(input))
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(EventTooltip)
