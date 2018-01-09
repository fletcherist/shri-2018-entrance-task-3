import { h } from 'preact'
import { connect } from 'preact-redux'
import { ButtonCreateMeeting } from '../components/button'
import { setBookingRoomType } from '../actions/app'
import {
  BOOKING_ROOM_TYPE_CREATING
} from '../actions/actionTypes'

const CreateEventButtonContainer = (props) => (
  <div onClick={props.changeEditEventMode}>
    <ButtonCreateMeeting />
  </div>
)

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  changeEditEventMode: () => dispatch(setBookingRoomType(BOOKING_ROOM_TYPE_CREATING))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEventButtonContainer)
