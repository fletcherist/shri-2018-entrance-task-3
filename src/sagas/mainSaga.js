// @flow

import { put, call, fork, takeEvery } from 'redux-saga/effects'
import { showModal, setModalData } from '../actions/modals'
import { fetchUsers } from '../actions/users'
import { fetchRooms } from '../actions/rooms'

import { setAppStatus } from '../actions/app'
import {
  APP_STATUS_LOADING,
  APP_STATUS_LOADED,
  APP_STATUS_FETCHING_FAILED
} from '../actions/actionTypes'

import eventsSaga from './eventsSaga'
import modalsSaga from './modalsSaga'
import Api from '../api'

function * usersSaga() {
  let users
  try { 
    users = yield call(Api.users.get)
  } catch (error) {

    console.log(error)
    return
  }
  yield put(fetchUsers(users))
}

function * roomsSaga() {
  let rooms
  try {
    rooms = yield call(Api.rooms.get)
  } catch (error) {
    return
  }
  yield put(fetchRooms(rooms))
}

function * appSaga() {

}

function * mainSaga() {
  yield fork(usersSaga)
  yield fork(eventsSaga)
  yield fork(roomsSaga)
  yield fork(appSaga)
  yield fork(modalsSaga)
}

export default mainSaga
