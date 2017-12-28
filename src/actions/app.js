import {
  SET_CURRENT_DATE,
  SET_NEXT_DATE,
  SET_PREVIOUS_DATE
} from './actionTypes'

export const setCurrentDate = (date) => ({
  type: SET_CURRENT_DATE,
  payload: date
})

export const setNextDay = (day) => ({
  type: SET_NEXT_DATE
})

export const setPreviousDay = (date) => ({
  type: SET_PREVIOUS_DATE
})