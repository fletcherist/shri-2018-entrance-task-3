import {
  FETCH_EVENTS
} from '../actions/actionTypes'

export default function usersReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_EVENTS:
      return {...state, ...action.payload}
    default: return state
  }
}
