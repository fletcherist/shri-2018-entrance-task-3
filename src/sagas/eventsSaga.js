// @flow

import { put, call, fork, takeEvery, select } from 'redux-saga/effects'
import { showModal, setModalData } from '../actions/modals'
import { fetchEvents, createEvent, editEvent } from '../actions/events'
import {
  setAppStatus,
  setNextDay,
  setPreviousDay,
  setCurrentDate
} from '../actions/app'
import {
  APP_STATUS_LOADING,
  APP_STATUS_LOADED,
  APP_STATUS_FETCHING_FAILED
} from '../actions/actionTypes'
import Api from '../api'
import { delay } from '../utils'

import {
  currentDateSelector
} from './selectors'

function * getEvents() {
  let events
  try {
    const currentDate = yield select(currentDateSelector)
    events = yield call(Api.events.getByDate, new Date(currentDate))
  } catch (error) {
    console.error(error)
    yield delay(1000)
    yield put(setAppStatus(APP_STATUS_FETCHING_FAILED))
    return
  }
  yield put(fetchEvents(events))
}

export default function * eventsSaga() {
  yield put(setAppStatus(APP_STATUS_LOADING))

  yield getEvents()

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

  // Handling nextDate/previousDate/setCurrentDate events and fetching events
  yield takeEvery(setNextDay().type, function * (action) {
    yield getEvents()
  })

  yield takeEvery(setPreviousDay().type, function * (action) {
    yield getEvents()
  })

  yield takeEvery(setCurrentDate().type, function * (action) {
    yield getEvents()
  })

  yield takeEvery(editEvent().type, function * (action) {
    console.log('editing event', action)
  })
}