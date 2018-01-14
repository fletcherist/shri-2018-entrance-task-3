import {
  FETCH_EVENTS,
  CREATE_EVENT,
  STORE_CLEAR_EVENTS
} from '../actions/actionTypes'

export default function eventsReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_EVENTS:
      return {...state, ...action.payload}
    case CREATE_EVENT:
      return state
    case STORE_CLEAR_EVENTS:
      return {}
    default: return state
  }
}
