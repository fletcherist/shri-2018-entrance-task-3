// @flow

import { h, Component } from 'preact'
import RecommendedRoom from './recommended-room'

type Props = {
  recommendedRooms: Array<Object>
};

const formatMinutes = minutes => minutes >= 10
  ? minutes
  : `0${minutes}`
const formatTime = (time) => {
  time = new Date(time)
  return [time.getHours(), formatMinutes(time.getMinutes())].join(':')
}
class RecommendedRooms extends Component<Props> {
  renderRooms() {
    return this.props.recommendedRooms.map(room => {
      return <RecommendedRoom
        floor={room.floor}
        timeStart={formatTime(room.dateStart)}
        timeEnd={formatTime(room.dateEnd)}
        name={room.title}
      />
    })
  }
  render() {
    return (
      <div>
        {this.renderRooms()}
      </div>
    )
  }
}

export default RecommendedRooms
