// @flow
import {
  SHOW_MODAL,
  HIDE_MODAL
} from '../actions/actionTypes'

const initialModalState = {
  isVisible: false
}

const initialState = {
  RemoveEventConfirm: initialModalState,
  CreateEventConfirm: initialModalState
}

export default function modalsReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {...state,
        ...{
          [action.payload]: {isVisible: true}
        }
      }
    case HIDE_MODAL:
      return {...state,
        ...{
          [action.payload]: {isVisible: false}
        }
      }
    default: return state
  }
}
