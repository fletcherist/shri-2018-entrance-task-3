import { h, Component } from 'preact'
import s from '../styles/current-time.css'

const formatMinutes = minutes => minutes >= 10
  ? minutes
  : `0${minutes}`
class CurrentTime extends Component {
  render() {
    const date = new Date()
    const time = [date.getHours(), formatMinutes(date.getMinutes())].join(':')
    return (
      <div className={s.container}>
        <div className={s.time}>{time}</div>
        <div className={s.line}></div>
      </div>
    )
  }
}

export default CurrentTime
