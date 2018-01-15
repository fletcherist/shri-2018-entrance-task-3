export const currentDateSelector = state => state.app.currentDate
export const currentEventIdSelector = state => state.app.currentEvent.id || null
export const currentEventSelector = state => state.app.currentEvent