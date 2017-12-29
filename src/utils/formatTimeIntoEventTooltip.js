const MONTHS = [
  'января', 'февраля', 'марта',
  'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября',
  'октября', 'ноября', 'декабря'
]
export function formatTimeIntoEventTooltip(dateStart, dateEnd) {
  console.log(dateStart)
  const newDateStart = new Date(dateStart)
  const newDateEnd = new Date(dateEnd)
  return [
    newDateStart.getDate(),
    `${MONTHS[newDateStart.getMonth()]},`,
    `${newDateStart.getHours()}:00—${newDateEnd.getHours()}:00`
  ].join(' ')
}