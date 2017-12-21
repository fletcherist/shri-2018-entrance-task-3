import {
  FETCH_USERS
} from './actionTypes'

export const putFetchedUsers = (users) => ({
  type: FETCH_USERS,
  payload: users
})
