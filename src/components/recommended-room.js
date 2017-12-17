import { h } from 'preact'
import { connect } from 'preact-fela'

const rule = state => ({
  padding: '13px 12px 14px',
  marginBottom: '8px',
  backgroundColor: '#E9ECEF',
  borderRadius: '4px'
})

const RecommendedRoom = ({
  floor, name, timeStart, timeEnd, styles
}) => (
  <div className={styles.rule}>
    <b>{timeStart} — {timeEnd}</b>
    <span style={{paddingLeft: '12px'}}>{name} · {floor} этаж</span>
  </div>
)

export default connect({rule})(RecommendedRoom)