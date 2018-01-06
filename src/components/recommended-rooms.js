import { h, Component } from 'preact'
import RecommendedRoom from './recommended-room'

class RecommendedRooms extends Component {
  render() {
    return (
      <div>
        <RecommendedRoom
          floor='4'
          timeStart='16:00'
          timeEnd='16:30'
          name='Готем'
        />
        <RecommendedRoom
          floor='4'
          timeStart='16:00'
          timeEnd='16:30'
          name='Готем'
        />
        <RecommendedRoom
          floor='4'
          timeStart='16:00'
          timeEnd='16:30'
          name='Готем'
        />
      </div>
    )
  }
}

export default RecommendedRooms
