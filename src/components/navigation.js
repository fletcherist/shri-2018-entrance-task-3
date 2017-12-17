import { h } from 'preact'
import YandexLogo from '../assets/logo.svg'
import { connect } from 'preact-fela'
import Divider from './divider'

const style = state => {
  return {
    padding: '15.8px 20.5px 11.3px'
  }
}

const Navigation = ({styles}) => (
  <div>
    <nav className={styles.style}>
      <a href='#/'>
        <img src={`dist/${YandexLogo}`}
          aria-label='Яндекс.Переговорки'
          title='Яндекс.Переговорки' />
      </a>
    </nav>
    <Divider />
  </div>
)

export default connect({
  style
})(Navigation)
