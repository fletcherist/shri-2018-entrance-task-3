// Months in javascript start from 0
const months = [
  'янв', 'фев', 'мар',
  'апр', 'май', 'июн',
  'июл', 'авг', 'сен',
  'окт', 'ноя', 'дек'
]

const days = [
  'пн', 'вт',
  'ср', 'чт',
  'пт', 'сб', 'вс'
]

export const formatTimeIntoDateSwitcher = (date) => {
  const currentMonth = date.getMonth()

  const currentDate = new Date().getDate()

  const isThatMonth = date.getMonth() === new Date().getMonth()
  const isToday = isThatMonth && date.getDate() === currentDate
  const isTomorrow = isThatMonth && date.getDate() === currentDate + 1
  const isYesteday = isThatMonth && date.getDate() === currentDate - 1


  return [
    date.getDate(),
    months[currentMonth],
    isToday ? '· Сегодня' : null,
    isTomorrow ? '· Завтра' : null,
    isYesteday ? '· Вчера' : null,
    (!isToday && !isTomorrow && !isYesteday)
      ? `· ${days[date.getDay()]}`
      : null
  ].filter(Boolean).join(' ')
}