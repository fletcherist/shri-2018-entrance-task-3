import { put, call, fork, takeEvery, select } from 'redux-saga/effects'
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

    const previousClickedElement = yield select(state => state.modals.EventTooltip.data.targetElement)
    if (!previousClickedElement) {
      
    }

    const elementCoordinates = getRelativeCoordinates(clickedElement)
    const elementProperties = clickedElement.getBoundingClientRect()

    // console.log(elementCoordinates)

    yield put(setModalData({
      modalName: 'EventTooltip',
      data: {
        x: elementCoordinates.x,
        y: elementCoordinates.y,
        width: elementProperties.width,
        height: elementProperties.height,
        targetElement: clickedElement.outerHTML
      }
    }))

    yield put(showModal('EventTooltip'))
  })
}
