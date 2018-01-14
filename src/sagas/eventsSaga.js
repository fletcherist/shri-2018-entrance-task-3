// @flow

import { put, call, fork, takeEvery, select } from 'redux-saga/effects'
import { showModal, setModalData, hideModal } from '../actions/modals'
import {
  fetchEvents,
  createEvent,
  editEvent,
  removeEvent,
  tryRemoveEvent,
  storeClearEvents
} from '../actions/events'
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
  currentDateSelector,
  currentEventIdSelector
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
  console.log('got events:', events)
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

  yield takeEvery(tryRemoveEvent().type, function * (action) {
    const currentEventId = yield select(currentEventIdSelector)
    if (!currentEventId) {
      console.error('[tryRemoveEvent]: no current event id')
      return false
    }
    yield put(setModalData({
      modalName: 'RemoveEventConfirm',
      data: {
        eventId: currentEventId
      }
    }))

    yield put(showModal('RemoveEventConfirm'))
  })

  yield takeEvery(removeEvent().type, function * (action) {
    const currentEventId = yield select(currentEventIdSelector)
    if (!currentEventId) {
      console.error('[tryRemoveEvent]: no current event id')
      return false
    }
    yield call(Api.events.remove, currentEventId)
    yield put(hideModal('RemoveEventConfirm'))
    yield put(storeClearEvents())
    yield getEvents()
    window.location.hash = '#/'
  })
}
