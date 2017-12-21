import { put, call, fork } from 'redux-saga/effects'
import { showModal } from '../actions/modals'
import { fetchUsers } from '../actions/users'
import { fetchEvents } from '../actions/events'
import { fetchRooms } from '../actions/rooms'
import Api from '../api'

function * usersSaga() {
  const users = yield call(Api.users.get)
  yield put(fetchUsers(users))
}

function * eventsSaga() {
  const events = yield call(Api.events.get)
  yield put(fetchEvents(events))
}

function * roomsSaga() {
  const rooms = yield call(Api.rooms.get)
  yield put(fetchRooms(rooms))
}

function * mainSaga() {
  yield put(showModal('RemoveEventConfirm'))

  yield fork(usersSaga)
  yield fork(eventsSaga)
  yield fork(roomsSaga)
}

export default mainSaga
