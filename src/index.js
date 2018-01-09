// @flow

import { h, Component, render } from 'preact'
import { Router } from 'preact-router'
import { Link } from 'preact-router'

import { createHashHistory } from 'history'
import { Provider, connect } from 'preact-redux'
import {
  Provider as FelaProvider,
  ThemeProvider
} from 'preact-fela'
import { createRenderer } from 'fela'

import Button, { ButtonCreateMeeting, ButtonCancel } from './components/button'
import Navigation from './components/navigation'
import RoomsTimetable from './containers/rooms-timetable'
import BookRoom from './containers/book-room'
import Footer from './components/footer'

import MainLayout from './containers/main-layout'

import createStore from './createStore'

const renderer = createRenderer()

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
  boxShadow: 'box-shadow: 0 1px 8px 0 rgba(0,44,92,0.28)'
}

const App = () => (
  <div>
    <Provider store={createStore()}>
      <FelaProvider renderer={renderer}>
        <ThemeProvider theme={theme}>
          <div>
            <Router history={createHashHistory()}>
              <MainLayout path='/' />
              <MainLayout path='/timetable' />
              <CreatePage path='/create' />
            </Router>
            <Footer />
          </div>
        </ThemeProvider>
      </FelaProvider>
    </Provider>
  </div>
)

const CreatePage = () => (
  <div>
    <Navigation />
    <BookRoom />
  </div>
)

document.getElementById('app').innerHTML = ''
render(<App />, document.getElementById('app'))
