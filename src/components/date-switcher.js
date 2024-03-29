// @flow

import { h, Component } from 'preact'
import { connect } from 'preact-fela'
import ArrowIcon from '../assets/arrow.svg'
import Divider from './divider'
import { formatTimeIntoDateSwitcher } from '../utils'
import s from '../styles/date-switcher.css'
import cx from 'classnames'

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

type Props = {
  setNextDay: Function,
  setPreviousDay: Function,
  setCurrentDate: Function,
  currentDate: Date
};
class DateSwitcher extends Component<Props> {
  constructor() {
    super()
    this.handleDateChange = this.handleDateChange.bind(this)
    this.state = {
      isDatepickerOpened: false
    }
  }

  handleDateChange(event: Event) {
    const newDate = new Date(event.target.value)
    this.props.setCurrentDate(newDate)
  }

  render({styles}) {
    console.log(this.props.currentDate)
    return (
      <div>
        <div className={s.container}>
          <div className={s.datepickerContainer}>
            <input type='date' className={s.datepicker} ref={(ref) => this.datepicker = ref}
              onChange={this.handleDateChange} />
          </div>
          <div className={s.wrapper}>
            <div className={s.icon} onClick={this.props.setPreviousDay}>
              <LeftIconWrapped />
            </div>
            <div className={cx({
              [s.label]: true,
              [s.currentDate]: this.props.currentDate.getDate() === new Date().getDate()
            })} onClick={this.handleClick} ref={ref => this.datepicker = ref}>
              {formatTimeIntoDateSwitcher(this.props.currentDate)}
            </div>
            <div onClick={this.props.setNextDay}>
              <RightIconWrapped />
            </div>
          </div>
        </div>
        <Divider />
      </div>
    )
  }
}

export default DateSwitcher
