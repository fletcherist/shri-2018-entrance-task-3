import { put } from 'redux-saga/effects'
import { showModal } from '../actions/modals'

function * mySaga() {
  console.log('hello saga')
  yield put(showModal('RemoveEventConfirm'))
  // yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}

export default mySaga
