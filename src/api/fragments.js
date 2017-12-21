import client from './graphql-client'

export const roomInfo = client.createFragment(`
  fragment on Room {
    id
    title
    capacity
    floor
  }
`)

export const userInfo = client.createFragment(`
  fragment on User {
    id
    login
    homeFloor
    avatarUrl
  }
`)

export const eventInfo = client.createFragment(`
  fragment on Event {
    id
    title
    dateStart
    dateEnd
    users {
      ...${userInfo}
    }
    room {
      ...${roomInfo}
    }
  }
`)
