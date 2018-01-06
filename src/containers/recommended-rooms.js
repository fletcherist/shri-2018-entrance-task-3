import { connect } from 'preact-redux'
import RecommendedRooms from '../components/recommended-rooms'
import { getRecommendation } from '../utils/getRecommendation'


const mapStateToProps = state => {
  const { rooms, users, events } = state
  return {

  }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps, mapDispatchToProps
)(RecommendedRooms)
