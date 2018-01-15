import { h } from 'preact'
import { connect } from 'preact-fela'

const rule = state => ({
  padding: '13px 12px 14px',
  marginBottom: '8px',
  backgroundColor: '#007DFF',
  borderRadius: '4px',
  color: 'white'
})

const formatMinutes = minutes => minutes >= 10
  ? minutes
  : `0${minutes}`
const formatTime = (time) => {
  time = new Date(time)
  return [time.getHours(), formatMinutes(time.getMinutes())].join(':')
}

const SelectedRoom = ({
  floor, title, dateStart, dateEnd, styles
}) => (
  <div className={styles.rule}>
    <b>{formatTime(dateStart)} — {formatTime(dateEnd)}</b>
    <span style={{paddingLeft: '12px'}}>{title} · {floor} этаж</span>
  </div>
)

export default connect({rule})(SelectedRoom)
