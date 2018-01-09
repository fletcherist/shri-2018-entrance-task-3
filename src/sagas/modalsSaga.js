import { put, call, fork, takeEvery } from 'redux-saga/effects'
import {
  handleEventTooltipModal,
  setModalData,
  showModal,
  hideModal
} from '../actions/modals'


 function getAbsolutePosition(element) {
    var r = { x: element.offsetLeft, y: element.offsetTop };
    if (element.offsetParent) {
      var tmp = getAbsolutePosition(element.offsetParent);
      r.x += tmp.x;
      r.y += tmp.y;
    }
    return r;
  };

export default function * modalsSaga() {
  yield takeEvery(handleEventTooltipModal().type, function * (action) {
    const clickedElement = action.payload.target

    const elementCoordinates = getAbsolutePosition(clickedElement)
    // const elementCoordinates = clickedElement.getBoundingClientRect()

    // console.log(elementCoordinates)

    yield put(setModalData({
      modalName: 'EventTooltip',
      data: {
        x: elementCoordinates.x,
        y: elementCoordinates.y,
        // left: elementCoordinates.left,
        // right: elementCoordinates.right,
        // top: elementCoordinates.top,
        // bottom: elementCoordinates.bottom,
        // height: elementCoordinates.height,
        // width: elementCoordinates.width
      }
    }))

    yield put(showModal('EventTooltip'))
  })
}
