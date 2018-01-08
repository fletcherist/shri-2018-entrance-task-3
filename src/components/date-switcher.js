// @flow

import { h, Component } from 'preact'
import { connect } from 'preact-fela'
import ArrowIcon from '../assets/arrow.svg'
import Divider from './divider'
import { formatTimeIntoDateSwitcher } from '../utils'
import s from '../styles/date-switcher.css'
import cx from 'classnames'
import Pikaday from 'pikaday'

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
  currentDate: Date
};
class DateSwitcher extends Component<Props> {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      isDatepickerOpened: false
    }
  }
  componentDidMount() {
    // this.picker = new Pikaday({
    //   field: this.datepicker,
    //   onSelect: function() {
    //     console.log(this.getMoment())
    //   }
    // })
    // console.log(this.picker)
  }
  handleClick(event) {
    console.log(this.state.isDatepickerOpened)
    this.setState({
      isDatepickerOpened: !this.state.isDatepickerOpened
    }, () => {
      if (this.state.isDatepickerOpened) this.picker.show()
      else setTimeout(() => { this.picker.hide() }, 0)
    })
  }
  render({styles}) {
    console.log(this.props.currentDate)
    return (
      <div>
        <div className={s.container}>
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
