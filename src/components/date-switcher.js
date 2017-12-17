import { h } from 'preact'
import { connect } from 'preact-fela'
import ArrowIcon from '../assets/arrow.svg'
import Divider from './divider'

/* styles */
const s = {
  container: {
    padding: '12px 16px'
  },
  wrapper: {
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: '100%'
  },
  label: {
    flexGrow: 1,
    textAlign: 'center',
    fontFamily: 'HelveticaNeue-Medium'
  },
  icon: {
    // justifyContent: 'flex-start',
    flexGrow: 0
  }
}

const iconStyle = state => ({
  padding: '7px',
  height: '11.3px',
  width: '11.3px'
})

const iconWrapperStyle = state => ({
  height: '32px',
  width: '32px',
  backgroundColor: '#E9ECEF',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer'
})

const LeftIcon = ({styles}) => (
  <div className={styles.iconWrapperStyle}>
    <img src={`dist/${ArrowIcon}`}
      className={styles.iconStyle} />
  </div>
)

const RightIcon = ({styles}) => (
  <div className={styles.iconWrapperStyle}>
    <img src={`dist/${ArrowIcon}`}
      style={{transform: 'rotate(-180deg)'}}
      className={styles.iconStyle} />
  </div>
)

const LeftIconWrapped = connect({iconStyle, iconWrapperStyle})(LeftIcon)
const RightIconWrapped = connect({iconStyle, iconWrapperStyle})(RightIcon)

const DateSwitcher = ({styles}) => (
  <div>
    <div style={s.container}>
      <div style={s.wrapper}>
        <div style={s.icon}><LeftIconWrapped /></div>
        <div style={s.label}>
          14 дек · Сегодня
        </div>
        <RightIconWrapped />
      </div>
    </div>
    <Divider />
  </div>
)

export default DateSwitcher
