import {
  FETCH_EVENTS,
  CREATE_EVENT
} from '../actions/actionTypes'

export default function eventsReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_EVENTS:
      return {...state, ...action.payload}
    case CREATE_EVENT:
      return state
    default: return state
  }
}
