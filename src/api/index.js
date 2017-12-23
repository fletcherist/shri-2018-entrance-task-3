import client from './graphql-client'
import { roomInfo, userInfo } from './fragments'
import { convertArrayToObject } from '../utils'

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

// fetchEvents().then(console.log)
// fetchUsers().then(console.log)
// fetchRooms().then(console.log)

export const createEvent = () => {
  const mutationQuery = `($input: EventInput!, $usersIds: [ID], $roomId: ID!){
    newEvent: createEvent(input: $input, usersIds: $usersIds, roomId: $roomId) {
      title
      dateStart
      dateEnd
    }
  }`

  const data = {
    input: {
      title: 'new event',
      dateStart: new Date().toString(),
      dateEnd: new Date(Date.now() + 10e7).toString()
    },
    roomId: 1,
    usersIds: [1, 2, 3]
  }

  client.mutate(mutationQuery, data).then(console.log)
}

export default {
  users: {
    get: fetchUsers
  },
  events: {
    get: fetchEvents
  },
  rooms: {
    get: fetchRooms
  }
}
