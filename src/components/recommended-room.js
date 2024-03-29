import { h } from 'preact'
import { connect } from 'preact-fela'

const rule = state => ({
  padding: '13px 12px 14px',
  marginBottom: '8px',
  backgroundColor: '#E9ECEF',
  borderRadius: '4px'
})

const formatMinutes = minutes => minutes >= 10
  ? minutes
  : `0${minutes}`
const formatTime = (time) => {
  time = new Date(time)
  return [time.getHours(), formatMinutes(time.getMinutes())].join(':')
}

const RecommendedRoom = ({
  floor, title, dateStart, dateEnd, styles, onSelect, id
}) => (
  <div className={styles.rule} onClick={() => onSelect({
    floor: floor,
    title: title,
    dateStart: dateStart,
    dateEnd: dateEnd,
    id: id
  })}>
    <b>{formatTime(dateStart)} — {formatTime(dateEnd)}</b>
    <span style={{paddingLeft: '12px'}}>{title} · {floor} этаж</span>
  </div>
)

export default connect({rule})(RecommendedRoom)
