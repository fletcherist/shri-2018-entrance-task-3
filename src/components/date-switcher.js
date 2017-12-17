import { h, Component } from 'preact'
import { connect } from 'preact-fela'
import ArrowIcon from '../assets/arrow.svg'
import Divider from './divider'
import Pikaday from 'pikaday'

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

class DateSwitcher extends Component {
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
    return (
      <div>
        <div style={s.container}>
          <div style={s.wrapper}>
            <div style={s.icon}><LeftIconWrapped /></div>
            <div style={s.label} onClick={this.handleClick} ref={ref => this.datepicker = ref}>
              14 дек · Сегодня
            </div>
            <RightIconWrapped />
          </div>
        </div>
        <Divider />
      </div>
    )
  }
}

export default DateSwitcher
