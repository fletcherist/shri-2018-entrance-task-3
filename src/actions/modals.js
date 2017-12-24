import {
  SHOW_MODAL,
  HIDE_MODAL,
  SET_MODAL_DATA
} from './actionTypes'

export const showModal = (modalName) => ({
  type: SHOW_MODAL,
  payload: modalName
})

export const hideModal = (modalName) => ({
  type: HIDE_MODAL,
  payload: modalName
})

export const setModalData = ({ modalName, data }) => ({
  type: SET_MODAL_DATA,
  payload: { modalName, data }
})