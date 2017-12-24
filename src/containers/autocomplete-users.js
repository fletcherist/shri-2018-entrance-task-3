import { connect } from 'preact-redux'
import AutocompleteUsers from '../components/autocomplete-users'

const mapStateTopProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(AutocompleteUsers)