import { put, call, fork } from 'redux-saga/effects'
import { showModal } from '../actions/modals'
import { putFetchedUsers } from '../actions/users'
import Api from '../api'

function * usersSaga() {
  const users = yield call(Api.users.get)
  yield put(putFetchedUsers(users))
}

function * eventsSaga() {
  const event = yield call(Api.events.get)
  
}

function * mySaga() {
  yield put(showModal('RemoveEventConfirm'))

  yield fork(usersSaga)
}

export default mySaga
