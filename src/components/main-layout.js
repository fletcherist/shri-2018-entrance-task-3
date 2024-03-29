import { h, Component } from 'preact'
import RoomsTimetable from '../containers/rooms-timetable'
import Spin from './spin'
import Navigation from './navigation'

import CreateEventConfirm from '../containers/create-event-confirm'
import RemoveEventConfirm from '../containers/remove-event-confirm'

import s from '../styles/main-layout.css'

import {
  APP_STATUS_LOADING,
  APP_STATUS_LOADED,
  APP_STATUS_FETCHING_FAILED
} from '../actions/actionTypes'

class MainLayout extends Component {
  renderContainer() {
    const { appStatus } = this.props
    if (appStatus === APP_STATUS_LOADING) {
      return (
        <div className={s.preloaderContainer}>
          <Spin size={60} />
        </div>
      )
    }

    if (appStatus === APP_STATUS_FETCHING_FAILED) {
      return (
        <div className={s.noConnectionNotice}>
          <div className={s.noConnectionPrimary}>Ошибка при загрузке данных.</div>
          <div className={s.noConnectionSecondary}>Может быть выключен Интернет?</div>
        </div>
      )
    }

    return <RoomsTimetable />
  }
  render() {
    return (
      <div>
        <Navigation withCreateEventButton />
        {this.renderContainer()}
        <CreateEventConfirm />
        <RemoveEventConfirm />
      </div>
    )
  }
}

export default MainLayout
