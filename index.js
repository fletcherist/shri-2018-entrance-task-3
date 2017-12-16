// @flow

import { h, Component, render } from 'preact'
import { Router } from 'preact-router'
import { Link } from 'preact-router'

import { createHashHistory } from 'history'

console.log(<Link />)

const App = () => (
  <div>
    hello wawawssss
    <a href='#/nav'>go to nav</a>
    <Router history={createHashHistory()}>
      {/*<Nav path='nav' />*/}
    </Router>
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
