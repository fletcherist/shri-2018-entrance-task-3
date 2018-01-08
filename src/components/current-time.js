// @flow

import { h, Component } from 'preact'
import s from '../styles/current-time.css'
import {
  getEventDurationInMinutes,
  getEventDurationInPixels,
} from '../utils'
import { getDayBeginning } from '../utils/transformEvents'

const COMPONENT_WIDTH = 54
const formatMinutes = minutes => minutes >= 10
  ? minutes
  : `0${minutes}`

type Props = {
  eventsScrollWidth: number
};
class CurrentTime extends Component<Props> {
  componentDidMount() {
    setInterval(() => this.setState({ itWillRerender: 'every' }), 30000)
  }
  render() {
    const date = new Date()
    const time = [date.getHours(), formatMinutes(date.getMinutes())]

    const timePassedFromDayBeginning = getEventDurationInMinutes(getDayBeginning(date), date)
    const timePassedInPixels = getEventDurationInPixels(
      timePassedFromDayBeginning,
      this.props.eventsScrollWidth
    )
    return (
      <div className={s.container} style={{
        transform: `translate(${timePassedInPixels - COMPONENT_WIDTH}px, 0)`
      }}>
        <div className={s.time}>
          <span>{time[0]}</span>
          <span className={s.secondsIndicator}>:</span>
          <span>{time[1]}</span>
        </div>
        <div className={s.line}></div>
      </div>
    )
  }
}

export default CurrentTime
