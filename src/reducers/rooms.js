import {
  FETCH_ROOMS
} from '../actions/actionTypes'
import { merge } from 'ramda'

export default function usersReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_ROOMS:
      return merge(state, action.payload)
    default: return state
  }
}
