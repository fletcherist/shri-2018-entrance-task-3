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
