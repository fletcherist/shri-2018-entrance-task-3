import {
  FETCH_EVENTS,
  CREATE_EVENT,
  EDIT_EVENT,
  REMOVE_EVENT,
  TRY_REMOVE_EVENT,
  STORE_CLEAR_EVENTS
} from './actionTypes'

export const fetchEvents = (events) => ({
  type: FETCH_EVENTS,
  payload: events
})

export const storeClearEvents = () => ({
  type: STORE_CLEAR_EVENTS
})

export const createEvent = (input) => ({
  type: CREATE_EVENT,
  payload: input
})

export const editEvent = input => ({
  type: EDIT_EVENT,
  payload: input
})

export const tryRemoveEvent = eventId => ({
  type: TRY_REMOVE_EVENT,
  payload: eventId
})

export const removeEvent = eventId => ({
  type: REMOVE_EVENT,
  payload: eventId
})
