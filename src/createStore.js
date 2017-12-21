import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import mainSaga from './sagas/mainSaga'

const initialState = {
  hello: 'wordl'
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'increment': return {...state}
    default: return state
  }
}

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const sagaMiddleware = createSagaMiddleware()

export default function createAppStore() {
  const store = createStore(
    combineReducers({
      modals: reducer,
      counter: counter
    }), {},
    compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )

  sagaMiddleware.run(mainSaga)
  return store
}
