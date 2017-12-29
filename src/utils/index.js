import { merge } from 'ramda'
import { transformEvents } from './transformEvents'
import { formatTimeIntoDateSwitcher } from './formatTimeIntoDateSwitcher'
import { formatTimeIntoEventTooltip } from './formatTimeIntoEventTooltip'

export {
  transformEvents,
  formatTimeIntoDateSwitcher,
  formatTimeIntoEventTooltip
}

export const isMobile = () => {
  if (navigator.userAgent.match(/Android/i)
   || navigator.userAgent.match(/webOS/i)
   || navigator.userAgent.match(/iPhone/i)
   || navigator.userAgent.match(/iPad/i)
   || navigator.userAgent.match(/iPod/i)
   || navigator.userAgent.match(/BlackBerry/i)
   || navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true
  } else {
    return false
  }
}

export const convertArrayToObject = (array) =>
  array.reduce((users, user) =>
    merge(users, {
      [user.id]: user
    }),
  {})

export const formatDateTime = (date, time) => {
  const formattedDateTime = new Date(date)
  const [hours, minutes] = time.split(':').map(Number)
  formattedDateTime.setHours(hours)
  formattedDateTime.setMinutes(minutes)
  return formattedDateTime
}

export function ending (iNumber, aEndings) {
  var sEnding, i
  iNumber = iNumber % 100
  if (iNumber >= 11 && iNumber <= 19) {
    sEnding = aEndings[2]
  } else {
    i = iNumber % 10
    switch (i) {
      case (1): sEnding = aEndings[0]; break
      case (2):
      case (3):
      case (4): sEnding = aEndings[1]; break
      default: sEnding = aEndings[2]
    }
  }
  return sEnding
}
