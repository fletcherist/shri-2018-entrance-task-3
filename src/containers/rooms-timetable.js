import { connect } from 'preact-redux'
import RoomsTimetable from '../components/rooms-timetable'
import { sort, sortBy, merge, propEq, groupBy } from 'ramda'

const mapStateToProps = state => {
  const sortByFloorComparator = (room1, room2) => room1.floor < room2.floor
  const rooms = sort(sortByFloorComparator, Object.values(state.rooms))

  const byRoom = groupBy(event => event.room.id)
  const eventsInRoom = byRoom(Object.values(state.events))

  return {
    rooms: rooms,
    eventsInRoom,
    events: state.events,
    users: state.users
  }
}

const mapDispatchToProps = dispatch => ({
  
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(RoomsTimetable)
