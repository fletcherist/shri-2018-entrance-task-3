import { put, call, fork, takeEvery } from 'redux-saga/effects'
import { handleEventTooltipModal } from '../actions/modals'

export default function * modalsSaga() {
  yield takeEvery(handleEventTooltipModal().type, function * (action) {
    const clickedElement = action.payload.target
    const elementCoordinates = clickedElement.getBoundingClientRect()
    console.log(elementCoordinates)
  })
}
