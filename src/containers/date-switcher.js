import { connect } from 'preact-redux'
import DateSwitcher from '../components/date-switcher'
import {
  setNextDay,
  setPreviousDay,
  setCurrentDate
} from '../actions/app'

const mapStateToProps = state => ({
  currentDate: state.app.currentDate
})

const mapDispatchToProps = dispatch => ({
  setNextDay: () => dispatch(setNextDay()),
  setPreviousDay: () => dispatch(setPreviousDay()),
  setCurrentDate: (date) => dispatch(setCurrentDate(date))
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(DateSwitcher)