// @flow

import { put, call, fork, takeEvery } from 'redux-saga/effects'
import { showModal, setModalData } from '../actions/modals'
import { fetchEvents, createEvent } from '../actions/events'
import { setAppStatus } from '../actions/app'
import {
  APP_STATUS_LOADING,
  APP_STATUS_LOADED,
  APP_STATUS_FETCHING_FAILED
} from '../actions/actionTypes'
import Api from '../api'
import { delay } from '../utils'

export default function * eventsSaga() {

  yield put(setAppStatus(APP_STATUS_LOADING))
  try {
    const events = yield call(Api.events.get)
  } catch (error) {
    yield delay(1000)
    yield put(setAppStatus(APP_STATUS_FETCHING_FAILED))
    return
  }
  yield put(fetchEvents(events))

  /* turning off the preloader */
  yield put(setAppStatus(APP_STATUS_LOADED))

  // Handling booking room event
  yield takeEvery(createEvent().type, function * (action) {
    const { title, dateStart, dateEnd, usersIds } = action.payload
    try {
      const newEvent = yield call(Api.events.create, {
        input: {
          title,
          dateStart,
          dateEnd
        },
        roomId: 1,
        usersIds: usersIds
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