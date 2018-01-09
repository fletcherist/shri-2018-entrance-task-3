import {
  SET_CURRENT_DATE,
  SET_NEXT_DATE,
  SET_PREVIOUS_DATE,

  SET_APP_STATUS,
  APP_STATUS_LOADING,

  SET_CURRENT_EVENT,

  SET_BOOKING_ROOM_TYPE,
  BOOKING_ROOM_TYPE_CREATING,
  RESET_CURRENT_EVENT
} from '../actions/actionTypes'

import { merge } from 'ramda'

const initialCurrentEvent = {
  title: '',
  dateStart: new Date(),
  dateEnd: new Date(),
  users: [],
  room: {
    title: '',
    capacity: 1,
    floor: 1
  }
}

const initialState = {
  currentDate: new Date(),
  currentEvent: initialCurrentEvent,
  appStatus: APP_STATUS_LOADING,
  bookingRoomType: BOOKING_ROOM_TYPE_CREATING
}

const ONE_HOUR = 1000 * 60 * 60
const ONE_DAY = ONE_HOUR * 24
export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_DATE:
      return merge(state, {
        currentDate: action.payload
      })
    case SET_NEXT_DATE:
      return merge(state, {
        currentDate: new Date(
          state.currentDate.getTime() + ONE_DAY
        )
      })
    case SET_PREVIOUS_DATE:
      return merge(state, {
        currentDate: new Date(
          state.currentDate.getTime() - ONE_DAY
        )
      })
    case SET_APP_STATUS:
      return merge(state, {
        appStatus: action.payload || false
      })

    case SET_CURRENT_EVENT:
      return merge(state, {
        currentEvent: action.payload
      })

    case SET_BOOKING_ROOM_TYPE:
      return merge(state, {
        bookingRoomType: action.payload
      })

    case RESET_CURRENT_EVENT:
      return merge(state, {
        currentEvent: initialCurrentEvent
      })
    default: return state
  }
}
