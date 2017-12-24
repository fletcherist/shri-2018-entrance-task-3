// @flow

import { put, call, fork, takeEvery } from 'redux-saga/effects'
import { showModal, setModalData } from '../actions/modals'
import { fetchUsers } from '../actions/users'
import { fetchRooms } from '../actions/rooms'
import eventsSaga from './eventsSaga'
import Api from '../api'

function * usersSaga() {
  const users = yield call(Api.users.get)
  yield put(fetchUsers(users))
}

function * roomsSaga() {
  const rooms = yield call(Api.rooms.get)
  yield put(fetchRooms(rooms))
}

function * appSaga() {

}

function * mainSaga() {
  yield fork(usersSaga)
  yield fork(eventsSaga)
  yield fork(roomsSaga)
  yield fork(appSaga)
}

export default mainSaga
