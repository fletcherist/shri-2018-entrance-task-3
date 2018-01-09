// @flow

import { h } from 'preact'
import YandexLogo from '../assets/logo.svg'
import Divider from './divider'
import s from '../styles/navigation.css'
import { isMobile } from '../utils'

import CreateEventButton from '../containers/create-event-button'

type propTypes = {
  withCreateEventButton: boolean
};
const Navigation = (props: propTypes) => {
  console.log(props)
  return (
    <div>
      <nav className={s.container}>
        <div>
          <a href='#/'>
            <img src={`dist/${YandexLogo}`}
              aria-label='Яндекс.Переговорки'
              title='Яндекс.Переговорки' />
          </a>
        </div>
        {props.withCreateEventButton && !isMobile() && (
          <div className={s.createMeetingBtn}>
            <a href='#/create'>
              <CreateEventButton />
            </a>
          </div>
        )}
      </nav>
      <Divider />
    </div>
  )
}

export default Navigation
