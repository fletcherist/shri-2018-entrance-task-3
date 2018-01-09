import { connect } from 'preact-redux'
import AutocompleteUsers from '../components/autocomplete-users'

const mapStateTopProps = state => {
  const usersArray = Object.values(state.users)
  return {
    users: state.users,
    usersArray: usersArray,
    initialParticipants: state.app.currentEvent.users
  }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(AutocompleteUsers)