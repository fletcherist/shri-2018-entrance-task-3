import {
  FETCH_ROOMS
} from './actionTypes'

export const fetchRooms = (rooms) => ({
  type: FETCH_ROOMS,
  payload: rooms
})
