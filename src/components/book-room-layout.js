import { h, Component } from 'preact'
import BookRoom from '../containers/book-room'
import Navigation from './navigation'

import CreateEventConfirm from '../containers/create-event-confirm'
import RemoveEventConfirm from '../containers/remove-event-confirm'

class BookRoomLayout extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <BookRoom />
        <CreateEventConfirm />
        <RemoveEventConfirm />
      </div>
    )
  }
}

export default BookRoomLayout
