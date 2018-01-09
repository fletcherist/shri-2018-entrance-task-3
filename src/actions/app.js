// @flow

import {
  SET_CURRENT_DATE,
  SET_NEXT_DATE,
  SET_PREVIOUS_DATE,

  SET_APP_STATUS,

  APP_STATUS_LOADING,
  APP_STATUS_LOADED,
  APP_STATUS_FETCHING_FAILED,

  SET_CURRENT_EVENT,

  SET_BOOKING_ROOM_TYPE,
  BOOKING_ROOM_TYPE_EDITING,
  BOOKING_ROOM_TYPE_CREATING,
  RESET_CURRENT_EVENT
} from './actionTypes'

export type appStatusType =
  APP_STATUS_LOADING |
  APP_STATUS_LOADED |
  APP_STATUS_FETCHING_FAILED;

export type appBookingRoomType =
  BOOKING_ROOM_TYPE_CREATING |
  BOOKING_ROOM_TYPE_EDITING;

export const setCurrentDate = (date: Date) => ({
  type: SET_CURRENT_DATE,
  payload: date
})

export const setNextDay = () => ({
  type: SET_NEXT_DATE
})

export const setPreviousDay = () => ({
  type: SET_PREVIOUS_DATE
})

export const setAppStatus = (appStatus: appStatusType) => ({
  type: SET_APP_STATUS,
  payload: appStatus
})

export const setCurrentEvent = (event: Object) => ({
  type: SET_CURRENT_EVENT,
  payload: event
})

export const setBookingRoomType = (bookingType: appBookingRoomType) => ({
  type: SET_BOOKING_ROOM_TYPE,
  payload: bookingType
})

export const resetCurrentEvent = () => ({
  type: RESET_CURRENT_EVENT,
  payload: null
})
