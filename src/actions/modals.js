import {
  SHOW_MODAL,
  HIDE_MODAL
} from './actionTypes'

export const showModal = (modalName) => ({
  type: SHOW_MODAL,
  payload: modalName
})

export const hideModal = (modalName) => ({
  type: HIDE_MODAL,
  payload: modalName
})
