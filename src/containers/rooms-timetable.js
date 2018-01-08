import { connect } from 'preact-redux'
import RoomsTimetable from '../components/rooms-timetable'
import { setCurrentEvent } from '../actions/app'
import { handleEventTooltipModal } from '../actions/modals'
import { sort, sortBy, merge, propEq, groupBy, filter } from 'ramda'

const mapStateToProps = state => {
  const sortByFloorComparator = (room1, room2) => room1.floor < room2.floor

  const filterByCurrentDate = (event, currentDate) =>
    new Date(event.dateStart).getDate() === currentDate.getDate()

  const rooms = sort(sortByFloorComparator, Object.values(state.rooms))

  let eventsArray = Object.values(state.events)
  eventsArray = eventsArray.filter(event =>
    filterByCurrentDate(event, state.app.currentDate))

  const groupByRoom = groupBy(event => event.room.id)
  const eventsInRoom = groupByRoom(eventsArray)

  return {
    rooms: rooms,
    eventsInRoom,
    events: state.events,
    users: state.users,
    appStatus: state.app.appStatus
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentEvent: (event) => dispatch(setCurrentEvent(event)),
  handleEventTooltipModal: (mouseEvent) => dispatch(handleEventTooltipModal(mouseEvent))
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(RoomsTimetable)
