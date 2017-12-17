// @flow

import { h, Component, render } from 'preact'
import { Router } from 'preact-router'
import { Link } from 'preact-router'

import { createHashHistory } from 'history'
import { Provider, coonect } from 'preact-redux'
import { createStore } from 'redux'
import {
  Provider as FelaProvider,
  ThemeProvider
} from 'preact-fela'
import { createRenderer } from 'fela'

import Button from './components/button'
import Navigation from './components/navigation'

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment': return {...state}
    default: return state
  }
}

const renderer = createRenderer()

const store = createStore(reducer, {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const theme = {
  colors: {
    button: {
      create: {
        normal: '#007DFF',
        pressed: '#0059FF',
        disabled: '#E9ECEF'
      },
      cancel: {
        normal: '#E9ECEF',
        pressed: '#DDE0E4',
        disabled: '#E9ECEF'
      }
    }
  },
  boxShadow: 'box-shadow: 0 1px 8px 0 rgba(0,44,92,0.28)',
}

const ButtonCreateMeeting = (props) => (
  <Button type='create' {...props}>Создать встречу</Button>
)

const ButtonCancel = (props) => (
  <Button type='cancel' {...props}>Отменить</Button>
)

const App = () => (
  <div>
    <Provider store={store}>
      <FelaProvider renderer={renderer}>
        <ThemeProvider theme={theme}>
          <div>
            {<Navigation />}
            <Router history={createHashHistory()}>
              <Main path='/' />
            </Router>
          </div>
        </ThemeProvider>
      </FelaProvider>
    </Provider>
  </div>
)

const Main = () => (
  <div>
    <ButtonCreateMeeting />
    <ButtonCancel />
  </div>
)

document.getElementById('app').innerHTML = ''
render(<App />, document.getElementById('app'))

console.log('hello world')
