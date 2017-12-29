import { merge, sort } from 'ramda'
import { EMPTY_EVENT, REAL_EVENT } from '../actions/actionTypes'


export const sortEventsByDate = events => sort(
  (event1, event2) =>
    (new Date(event1.dateStart) > new Date(event2.dateStart)),
  events)
export function transformEvents(events) {
  events = sortEventsByDate(events)
  const newEvents = []
  events.forEach((event, index) => {
    let { dateStart, dateEnd } = event

    if (typeof dateStart === 'string')
        dateStart = new Date(dateStart)
    if (typeof dateEnd === 'string')
        dateEnd = new Date(dateEnd)

    /*
     * filling the gap before first event
     */
    if (index === 0) {
      /* e.g 25.12.2017 8:00 AM */
      const dayBeginning = getDayBeginning(dateStart)
      if (dayBeginning < dateStart) {
        newEvents.push({
          type: EMPTY_EVENT,
          dateStart: dayBeginning,
          dateEnd: dateStart
        })
      }
    }

    if (index > 0) {
      const previousEvent = events[index - 1]
      /*
       * handling the gap between two events in the row
       */
      if (new Date(previousEvent.dateEnd).getTime() <
          new Date(dateStart).getTime()) {
        newEvents.push({
          type: EMPTY_EVENT,
          dateStart: previousEvent.dateEnd,
          dateEnd: dateStart
        })
      }
    }

    newEvents.push(
      merge(event, {
        type: REAL_EVENT,
        dateStart: dateStart,
        dateEnd: dateEnd
      }))

    /*
     * filling the gap after last event
     */
    if (index === events.length - 1) {
      /* e.g 26.12.2017 0:00 */
      const dayEnding = getDayEnding(dateStart)
      if (dateEnd < dayEnding) {
        newEvents.push({
          type: EMPTY_EVENT,
          dateStart: dateEnd,
          dateEnd: dayEnding
        })
      }
    }
  })
  return newEvents
}

export function getDayBeginning(date) {
  const newDate = new Date(date)
  newDate.setHours(8)
  newDate.setMinutes(0)
  newDate.setSeconds(0)
  return newDate
}

export function getDayEnding(date) {
  const newDate = new Date(date)
  newDate.setHours(0)
  newDate.setMinutes(0)
  newDate.setSeconds(0)
  newDate.setDate(newDate.getDate() + 1)
  return newDate
}

/*
 *  Some test cases
 */ 
const events = [
  {
    title: 'greetings',
    dateStart: new Date(1514201642802),
    dateEnd: new Date(1514208851959)
  },
  {
    dateStart: new Date(1514208851959),
    dateEnd: new Date(1514216051959)
  }, {
    dateStart: new Date(1514226851959),
    dateEnd: new Date(1514230451959)
  }
]