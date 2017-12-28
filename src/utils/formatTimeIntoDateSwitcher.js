// Months in javascript start from 0
const months = [
  'янв', 'фев', 'мар',
  'апр', 'май', 'июн',
  'июл', 'авг', 'сен',
  'окт', 'ноя', 'дек'
]

const days = [
  'Понедельник', 'Вторник',
  'Среда', 'Четверг',
  'Пятница', 'Суббота', 'Воскресенье'
]

export const formatTimeIntoDateSwitcher = (date) => {
  const currentMonth = date.getMonth()

  const currentDate = new Date().getDate()
  const isToday = date.getDate() === currentDate
  const isTomorrow = date.getDate() === currentDate + 1
  const isYesteday = date.getDate() === currentDate - 1

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