import { connect } from 'preact-redux'
import { createEvent } from '../actions/events'
import BookRoom from '../components/book-room'

const mapStateToProps = () => {
  return {

  }
}

const mapDispatchToProps = dispatch => ({
  createEvent: input => dispatch(createEvent(input))
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(BookRoom)
