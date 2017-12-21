import { put } from 'redux-saga/effects'
import { showModal } from '../actions/modals'
import api from '../api'

function * mySaga() {
  yield put(showModal('RemoveEventConfirm'))
  // yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}

export default mySaga
