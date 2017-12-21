import {
  FETCH_EVENTS
} from './actionTypes'

export const fetchEvents = (events) => ({
  type: FETCH_EVENTS,
  payload: events
})
