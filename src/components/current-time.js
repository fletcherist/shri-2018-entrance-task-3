// @flow

import { h, Component } from 'preact'
import s from '../styles/current-time.css'
import {
  getEventDurationInMinutes,
  getEventDurationInPixels,
} from '../utils'
import { getDayBeginning } from '../utils/transformEvents'

const formatMinutes = minutes => minutes >= 10
  ? minutes
  : `0${minutes}`

type Props = {
  eventsScrollWidth: number
};
class CurrentTime extends Component<Props> {

  render() {
    const date = new Date()
    const time = [date.getHours(), formatMinutes(date.getMinutes())].join(':')

    const timePassedFromDayBeginning = getEventDurationInMinutes(getDayBeginning(date), date)
    const timePassedInPixels = getEventDurationInPixels(
      timePassedFromDayBeginning,
      this.props.eventsScrollWidth
    )
    console.log()
    return (
      <div className={s.container} style={{marginLeft: `${timePassedInPixels - 54}px`}}>
        <div className={s.time}>{time}</div>
        <div className={s.line}></div>
      </div>
    )
  }
}

export default CurrentTime
