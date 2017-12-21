import { h } from 'preact'

export const Divider = () => (
  <div style={{borderBottom: '1px solid #E9ECEF'}}></div>
)

export const BigDivider = () => (
  <div style={{borderBottom: '8px solid rgba(233,236,239,1)'}}></div>
)

export const EmptyDivider = ({ height }) => (
  <div style={{height: height || '16px'}}></div>
)

export const HorizontalDivider = ({ width }) => (
  <div style={{
    width: width ? `${width}px` : '8px',
    backgroundColor: 'transparent',
    display: 'inline-block'
  }}></div>
)

export default Divider
