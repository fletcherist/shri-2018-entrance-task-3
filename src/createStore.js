import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import mainSaga from './sagas/mainSaga'

import modalsReducer from './reducers/modals'
import usersReducer from './reducers/users'
import eventsReducer from './reducers/events'
import roomsReducer from './reducers/rooms'
import appReducer from './reducers/app'

const reducers = combineReducers({
  modals: modalsReducer,
  users: usersReducer,
  events: eventsReducer,
  rooms: roomsReducer,
  app: appReducer
})
const sagaMiddleware = createSagaMiddleware()

export default function createAppStore() {
  const store = createStore(
    reducers,
    {},
    compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )

  sagaMiddleware.run(mainSaga)
  return store
}
