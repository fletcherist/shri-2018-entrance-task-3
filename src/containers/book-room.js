import { connect } from 'preact-redux'
import { createEvent } from '../actions/events'
import BookRoom from '../components/book-room'

const mapStateToProps = (state) => {
  return {
    currentEvent: state.app.currentEvent || {},
    bookingRoomType: state.app.bookingRoomType
  }
}

const mapDispatchToProps = dispatch => ({
  createEvent: input => dispatch(createEvent(input))
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(BookRoom)
