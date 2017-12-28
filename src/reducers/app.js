import {
  SET_CURRENT_DATE,
  SET_NEXT_DATE,
  SET_PREVIOUS_DATE
} from '../actions/actionTypes'
import { merge } from 'ramda'

const initialState = {
  currentDate: new Date()
}

const ONE_HOUR = 1000 * 60 * 60
const ONE_DAY = ONE_HOUR * 24
export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_DATE:
      return merge(state, {
        currentDate: action.payload
      })
    break
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
    default: return state
  }
}