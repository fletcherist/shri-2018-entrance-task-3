import {
  FETCH_USERS
} from './actionTypes'

export const fetchUsers = (users) => ({
  type: FETCH_USERS,
  payload: users
})
