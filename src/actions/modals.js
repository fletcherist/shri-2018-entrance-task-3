import {
  SHOW_MODAL,
  HIDE_MODAL,
  SET_MODAL_DATA,

  HANDLE_EVENT_TOOLTIP
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

export const handleEventTooltipModal = (mouseEvent) => ({
  type: HANDLE_EVENT_TOOLTIP,
  payload: mouseEvent
})
