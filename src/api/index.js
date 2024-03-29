// @flow

import client from './graphql-client'
import { roomInfo, userInfo } from './fragments'
import {
  convertArrayToObject,
  getNextDate
} from '../utils'

export const fetchUsers = async () => {
  const usersArray = await client.query(`
    {
      users {
        ...${userInfo}
      }
    }
  `)
  if (usersArray.users.length === 0) return {}
  /* transforming users array to users object */
  return convertArrayToObject(usersArray.users)
}

export const fetchEvents = async () => {
  const eventsArray = await client.query(`
    {
      events {
        id
        title
        dateStart
        dateEnd
        users {
          id
          username
          avatarUrl
        }
        room {
          ...${roomInfo}
        }
      }
    }
  `)
  if (eventsArray.events.length === 0) return {}
  /* transforming evenys array to events object */
  return convertArrayToObject(eventsArray.events)
}

export const fetchEventsByDate = async (dateStart: Date, dateEnd: Date) => {
  if (!dateEnd) {
    dateEnd = getNextDate(dateStart)
  }
  const eventsArray = await client.query(`
    {
      events(dateStart: "${dateStart.toISOString()}", dateEnd: "${dateEnd.toISOString()}") {
        id
        title
        dateStart
        dateEnd
        users {
          id
          username
          avatarUrl
        }
        room {
          ...${roomInfo}
        }
      }
    }
  `)

  if (eventsArray.events.length === 0) return {}
  /* transforming evenys array to events object */
  return convertArrayToObject(eventsArray.events)
}

export const fetchRooms = async () => {
  const roomsArray = await client.query(`
    {
      rooms {
        ...${roomInfo}
      }
    }
  `)
  if (roomsArray.rooms.length === 0) return {}

  /* transforming evenys array to events object */
  return convertArrayToObject(roomsArray.rooms)
}

type createEventDataType = {
  input: {
    title: string,
    dateStart: Date,
    dateEnd: Date
  },
  roomId: number,
  usersIds: Array<number>
};
export const createEvent = async (data: createEventDataType) => {
  const mutationQuery = `($input: EventInput!, $usersIds: [ID], $roomId: ID!){
    newEvent: createEvent(input: $input, usersIds: $usersIds, roomId: $roomId) {
      title
      dateStart
      dateEnd
      room {
        ...${roomInfo}
      }
    }
  }`
  return await client.mutate(mutationQuery, data)
}

export const removeEvent = async (eventId: number) => {
  const mutationQuery = `($eventId: ID!){
    event: removeEvent(id: $eventId) {
      id
    }
  }`
  return await client.mutate(mutationQuery, { eventId })
}

type updateEventDataType = {
  title: string,
  dateStart: Date,
  dateEnd: Date
};
export const updateEvent = async (eventId: number, data: updateEventDataType) => {
  const mutationQuery = `($input: EventInput!, $id: ID!){
    newEvent: updateEvent(input: $input, id: $id) {
      title
      dateStart
      dateEnd
      room {
        ...${roomInfo}
      }
    }
  }`
  return await client.mutate(mutationQuery, {
    id: eventId,
    input: data
  })
}

export default {
  users: {
    get: fetchUsers
  },
  events: {
    get: fetchEvents,
    getByDate: fetchEventsByDate,
    create: createEvent,
    remove: removeEvent,
    update: updateEvent
  },
  rooms: {
    get: fetchRooms
  }
}
