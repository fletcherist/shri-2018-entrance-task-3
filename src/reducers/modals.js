// @flow

import {
  SHOW_MODAL,
  HIDE_MODAL,
  SET_MODAL_DATA
} from '../actions/actionTypes'
import { merge } from 'ramda'

const initialModalState = {
  isVisible: false,
  data: {}
}

const initialState = {
  RemoveEventConfirm: initialModalState,
  CreateEventConfirm: initialModalState
}

export default function modalsReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return merge(state, {
        [action.payload]: merge(
          state[action.payload],
          {isVisible: true}
        )
      })
    case HIDE_MODAL:
      return merge(state, {
        [action.payload]: merge(
          state[action.payload],
          {isVisible: false}
        )
      })
    case SET_MODAL_DATA:
      return merge(state, {
        [action.payload.modalName]: merge(
          state[action.payload.modalName],
          {data: {...action.payload.data}}
        )
      })
    default: return state
  }
}
