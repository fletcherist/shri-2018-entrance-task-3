// @flow

import { put, call, fork, takeEvery } from 'redux-saga/effects'
import { showModal, setModalData } from '../actions/modals'
import { fetchEvents, createEvent } from '../actions/events'
import Api from '../api'

export default function * eventsSaga() {
  const events = yield call(Api.events.get)
  yield put(fetchEvents(events))

  // Handling booking room event
  yield takeEvery(createEvent().type, function * (action) {
    const { title, dateStart, dateEnd } = action.payload
    try {
      const newEvent = yield call(Api.events.create, {
        input: {
          title,
          dateStart,
          dateEnd
        },
        roomId: 1,
        usersIds: [1, 2, 3]
      })
      yield put(setModalData({
        modalName: 'CreateEventConfirm',
        data: newEvent.newEvent
      }))
      yield put(showModal('CreateEventConfirm'))
    } catch (error) {
      throw new Error(error)
    }
  })
}