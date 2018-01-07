import { h, Component } from 'preact'
import RoomsTimetable from '../containers/rooms-timetable'
import Spin from './spin'
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
        {this.renderContainer()}
      </div>
    )
  }
}

export default MainLayout
