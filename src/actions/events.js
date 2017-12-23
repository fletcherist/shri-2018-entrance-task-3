import {
  FETCH_EVENTS,
  CREATE_EVENT
} from './actionTypes'

export const fetchEvents = (events) => ({
  type: FETCH_EVENTS,
  payload: events
})

export const createEvent = (input) => ({
  type: CREATE_EVENT,
  payload: input
})
