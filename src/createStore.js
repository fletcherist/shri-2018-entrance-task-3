import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import mainSaga from './sagas/mainSaga'

import modalsReducer from './reducers/modals'

const sagaMiddleware = createSagaMiddleware()

export default function createAppStore() {
  const store = createStore(
    combineReducers({
      modals: modalsReducer
    }), {},
    compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )

  sagaMiddleware.run(mainSaga)
  return store
}
