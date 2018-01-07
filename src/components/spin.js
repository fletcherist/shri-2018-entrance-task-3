import { h } from 'preact'
import s from '../styles/spin.css'

const Spin = ({size}) => (
  <span className={s.wrapper}>
    <i className={s.control} style={{
      width: size ? `${size}px` : null,
      height: size ? `${size}px` : null
    }}/>
  </span>
)

export default Spin