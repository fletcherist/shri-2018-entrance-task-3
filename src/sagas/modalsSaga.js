import { put, call, fork, takeEvery } from 'redux-saga/effects'
import {
  handleEventTooltipModal,
  setModalData,
  showModal,
  hideModal
} from '../actions/modals'

import { getRelativeCoordinates } from '../utils/getRelativeCoordinates'

export default function * modalsSaga() {
  yield takeEvery(handleEventTooltipModal().type, function * (action) {
    const clickedElement = action.payload.target

    const elementCoordinates = getRelativeCoordinates(clickedElement)
    const elementProperties = clickedElement.getBoundingClientRect()

    // console.log(elementCoordinates)

    yield put(setModalData({
      modalName: 'EventTooltip',
      data: {
        x: elementCoordinates.x,
        y: elementCoordinates.y,
        width: elementProperties.width,
        height: elementProperties.height
      }
    }))

    yield put(showModal('EventTooltip'))
  })
}
