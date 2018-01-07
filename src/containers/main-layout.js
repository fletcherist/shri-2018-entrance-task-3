import { connect } from 'preact-redux'
import MainLayout from '../components/main-layout'

const mapStateTopProps = state => {
  return {
    appStatus: state.app.appStatus
  }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(MainLayout)