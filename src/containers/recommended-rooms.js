import { connect } from 'preact-redux'
import RecommendedRooms from '../components/recommended-rooms'
import { getRecommendation } from '../utils/getRecommendation'


const mapStateToProps = state => {
  const { rooms, users, events } = state
  const recommendedRooms = getRecommendation(rooms, users, events)
  return {
    recommendedRooms: recommendedRooms
  }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps, mapDispatchToProps
)(RecommendedRooms)
