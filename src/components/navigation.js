import { h } from 'preact'
import YandexLogo from '../assets/logo.svg'
import { connect } from 'preact-fela'

const style = state => {
  return {
    borderBottom: '1px solid #FFE9ECEF',
    padding: '15.8px 20.5px 11.3px'
  }
}

const Navigation = ({styles}) => (
  <nav className={styles.style}>
    <a href='#/'>
      <img src={`dist/${YandexLogo}`}
        aria-label='Яндекс.Переговорки'
        title='Яндекс.Переговорки' />
    </a>
  </nav>
)

export default connect({
  style
})(Navigation)
