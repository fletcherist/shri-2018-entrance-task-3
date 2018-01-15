// @flow

import { merge, sort } from 'ramda'
import { EMPTY_EVENT, REAL_EVENT } from '../actions/actionTypes'
import { initialCurrentEvent } from '../reducers/app'

export const MINUTES_BETWEEN_8_AND_24 = 960
export const getEventDurationInMinutes =
  (startTime: Date, endTime: Date) =>
    (endTime - startTime) / 1000 / 60
export const getEventDurationInPixels =
  (eventDurationInMinutes: number, eventsScrollWidth: number) =>
    eventDurationInMinutes * eventsScrollWidth / MINUTES_BETWEEN_8_AND_24

export const sortEventsByDate = events => sort(
  (event1, event2) =>
    (new Date(event1.dateStart) > new Date(event2.dateStart)),
  events)
export function transformEvents(
  events: Array<Object>,
  room: Object = initialCurrentEvent.room
) {
  events = sortEventsByDate(events)
  if (events.length === 0) return []

  const newEvents = []
  events.forEach((event, index) => {
    let { dateStart, dateEnd } = event

    if (typeof dateStart === 'string') {
      dateStart = new Date(dateStart)
    }
    if (typeof dateEnd === 'string') {
      dateEnd = new Date(dateEnd)
    }

    /*
     * filling the gap before first event
     */
    if (index === 0) {
      /* e.g 25.12.2017 8:00 AM */
      const dayBeginning = getDayBeginning(dateStart)
      if (dayBeginning < dateStart) {
        newEvents.push(merge(initialCurrentEvent, {
          type: EMPTY_EVENT,
          dateStart: dayBeginning,
          dateEnd: dateStart,
          room: room
        }))
      }
    }

    if (index > 0) {
      const previousEvent = events[index - 1]
      /*
       * handling the gap between two events in the row
       */
      if (new Date(previousEvent.dateEnd).getTime() <
          new Date(dateStart).getTime()) {
        newEvents.push(merge(initialCurrentEvent, {
          type: EMPTY_EVENT,
          dateStart: previousEvent.dateEnd,
          dateEnd: dateStart,
          room: room
        }))
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
      let nextHour = getNextHour(dateStart)

      // ??? Bad code

      // while (nextHour < dayEnding) {
      //   newEvents.push({
      //     type: EMPTY_EVENT,
      //     dateStart: nextHour,
      //     dateEnd: getNextHour(nextHour)
      //   })
      //   nextHour = getNextHour(nextHour)
      // }
      if (dateEnd < dayEnding) {
        newEvents.push({
          type: EMPTY_EVENT,
          dateStart: dateEnd,
          dateEnd: dayEnding,
          room: room
        })
      }
    }
  })
  return newEvents
}

export function getDayBeginning(date: Date) {
  const newDate = new Date(date)
  newDate.setHours(8)
  newDate.setMinutes(0)
  newDate.setSeconds(0)
  return newDate
}

export function getDayEnding(date: Date) {
  const newDate = new Date(date)
  newDate.setHours(0)
  newDate.setMinutes(0)
  newDate.setSeconds(0)
  newDate.setDate(newDate.getDate() + 1)
  return newDate
}

export function getNextHour(date: Date) {
  const newDate = new Date(date)
  newDate.setHours(newDate.getHours() + 1)
  newDate.setMinutes(0)
  newDate.setSeconds(0)
  return newDate
}
