import { merge } from 'ramda'

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
