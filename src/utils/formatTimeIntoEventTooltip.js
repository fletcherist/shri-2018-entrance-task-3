const MONTHS = [
  'января', 'февраля', 'марта',
  'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября',
  'октября', 'ноября', 'декабря'
]

export const formatMinutes = time => time >= 10
  ? time
  : `0${time}`

export const formatHours = formatMinutes
export const formatMonths = formatMinutes
export const formatDate = formatMinutes

export function formatTimeIntoEventTooltip(dateStart, dateEnd) {
  console.log(dateStart)
  const newDateStart = new Date(dateStart)
  const newDateEnd = new Date(dateEnd)
  return [
    newDateStart.getDate(),
    `${MONTHS[newDateStart.getMonth()]},`,
    `${newDateStart.getHours()}:${formatMinutes(newDateStart.getMinutes())}—${newDateEnd.getHours()}:${formatHours(newDateEnd.getMinutes())}`
  ].join(' ')
}
