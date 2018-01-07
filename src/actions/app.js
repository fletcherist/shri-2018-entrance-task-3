// @flow

import {
  SET_CURRENT_DATE,
  SET_NEXT_DATE,
  SET_PREVIOUS_DATE,

  SET_APP_STATUS,

  APP_STATUS_LOADING,
  APP_STATUS_LOADED,
  APP_STATUS_FETCHING_FAILED
} from './actionTypes'

export type appStatusType =
  APP_STATUS_LOADING |
  APP_STATUS_LOADED |
  APP_STATUS_FETCHING_FAILED;

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