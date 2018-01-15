// @flow

import { h, Component } from 'preact'
import RecommendedRoom from './recommended-room'

type Props = {
  recommendedRooms: Array<Object>,
  onSelect: Function
};

class RecommendedRooms extends Component<Props> {
  renderRooms() {
    return this.props.recommendedRooms.map(room => {
      return <RecommendedRoom
        floor={room.floor}
        dateStart={room.dateStart}
        dateEnd={room.dateEnd}
        title={room.title}
        onSelect={this.props.onSelect}
        id={room.id}
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
