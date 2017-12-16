// @flow

import { h, Component, render } from 'preact'
import { Router } from 'preact-router'
import { Link } from 'preact-router'

import { createHashHistory } from 'history'
import { Provider, coonect } from 'preact-redux'
import { createStore } from 'redux'

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment': return {...state}
    default: return state
  }
}

const store = createStore(reducer, {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const App = () => (
  <div>
    <Provider store={store}>
      hello wawawssss
      <a href='#/nav'>go to nav</a>
      <Router history={createHashHistory()}>
        {/*<Nav path='nav' />*/}
      </Router>
    </Provider>
  </div>
)

const Nav = () => (
  <ul>
    <li>
      again hello
      <a href='#/go-to-main'>go to main</a>
    </li>
  </ul>
)

document.getElementById('app').innerHTML = ''
render(<App />, document.getElementById('app'))

console.log('hello world')
