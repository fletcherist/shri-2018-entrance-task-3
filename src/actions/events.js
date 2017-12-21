import {
  FETCH_EVENTS
} from './actionTypes'

export const putFetchedEvents = (users) => ({
  type: FETCH_EVENTS,
  payload: users
})
