import client from './graphql-client'
import { roomInfo, userInfo } from './fragments'

export const fetchUsers = async () => await client.query(`
  {
    users {
      ...${userInfo}
    }
  }
`)

export const getEvents = async () => await client.query(`
  {
    events {
      id
      title
      dateStart
      dateEnd
      room {
        ...${roomInfo}
      }
    }
  }
`)

// getEvents().then(console.log)
fetchUsers().then(console.log)
