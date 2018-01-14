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

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : null

const middlewares = [
  applyMiddleware(sagaMiddleware),
  reduxDevtools
].filter(Boolean)

export default function createAppStore() {
  const store = createStore(
    reducers,
    {},
    compose(...middlewares)
  )

  sagaMiddleware.run(mainSaga)
  return store
}
