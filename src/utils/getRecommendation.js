//@flow
import {
  filter,
  sort,
  curry,
  compose,
  reduce,
  merge,
  mergeWith,
  sum,
  groupBy
} from 'ramda'
import { transformEvents } from './transformEvents'
import { EMPTY_EVENT } from '../actions/actionTypes'

/* required data for room */
type roomType = {
  id: string,
  title: string,
  capacity: number,
  floor: number
};

/* required data for user */
type userType = {
  id: string,
  homeFloor: number
};

/* required data types for every event */
type eventType = {
  id: string,
  dateStart: string,
  dateEnd: string,
};

type roomsType = { [key: string]: roomType };
type usersType = { [key: string]: userType };
type eventsType = { [key: string]: eventType };

const getDistanceFromUserWorkspace = (roomFloor: number, userFloor: number) =>
  Math.abs(roomFloor - userFloor)
const getDistanceFromUsersToRoom = (users: Array<userType>, room: roomType) =>
  users.reduce((distance, user) =>
    distance + getDistanceFromUserWorkspace(room.floor, user.homeFloor), 0)

/*
 * Sorts from the shortest distance to the longest
 */
const sortRoomsByDistanceFromUsers = curry(
  (users: Array<userType>, rooms: Array<roomType>) =>
    sort((room1, room2) =>
      getDistanceFromUsersToRoom(users, room1) >
      getDistanceFromUsersToRoom(users, room2)
    )(rooms)
)

const sortRoomsByCapacityAndUsersAmount = curry(
  (usersAmount: number, rooms: Array<roomType>) =>
    compose(
      /*
       * sorts by users amount.
       * if room's `capacity` is less than `usersAmount` →
       * → then swap
       */
      rooms => sort(room => room.capacity < usersAmount)(rooms),
      /*
       * sorts in the descending order ex. 7 6 5 4...
       */
      rooms => sort((room1, room2) => room1.capacity < room2.capacity)(rooms)
    )(rooms)
)

/*
 * This function converts room's array
 * to correlating hash table (left items are better than right)
 *
 * hash table represents roomId with key and value between (0, 1)
 * which represents index of likenesses.
 */
const createRoomsIndexes = (rooms: Array<roomType>) =>
  rooms.reduce((roomsIndexes, room, roomIndex) =>
    merge(roomsIndexes, {[room.id]:
      (rooms.length - roomIndex) / rooms.length}),
  {})

const mergeRoomsIndexes = (roomsIndexes) => {
  const mergedRoomsIndex = {}
  roomsIndexes.forEach(roomIndex => {
    for (let index in roomIndex) {
      mergedRoomsIndex[index] = (mergedRoomsIndex[index] || 0) + roomIndex[index]
    }
  })
  return mergedRoomsIndex
}

const transformRoomsIndexesObjectIntoArray = (roomsIndexes) =>
  Object.keys(roomsIndexes).map(key => ({
    key: key,
    value: roomsIndexes[key]
  }))

const sortRoomsIndexes = (roomsIndexes) => sort(
  (index1, index2) => index1.value < index2.value
)(roomsIndexes)

const findRoomById = curry((rooms, id) => rooms.filter(room => room.id === id)[0])

const groupEventsByRoom = events => groupBy(event => event.room.id)(events)

const excludeRealEvents = events => filter(event => event.type === EMPTY_EVENT)(events)
const filterEventsByDateStart = (events, dateStart) =>
  filter(event => new Date(event.dateStart) > new Date(dateStart))(events)

/*
 * This function finds most suitable rooms for booking
 *
 * rooms All available rooms
 * users Event's participants
 * events All events on that particular date
 * dateStart
 */
export function getRecommendation(
  rooms: roomsType,
  users: usersType,
  events: eventsType,
  dateStart: Date = new Date()
): Array<roomType> {
  /* transforming rooms object to rooms array */
  rooms = Object.values(rooms)
  /* transforming users object to users array */
  users = Object.values(users)

  const eventsArray = Object.values(events)
  const eventsInRooms = groupEventsByRoom(eventsArray)
  /* both REAL_EVENT and EMPTY_EVENT */
  const emptyEventsInRooms = {}

  Object.keys(eventsInRooms).map(key => {
    const emptyEvents = compose(excludeRealEvents, transformEvents)(eventsInRooms[key])
    emptyEventsInRooms[key] = filterEventsByDateStart(emptyEvents, dateStart)
  })

  const getRoom = findRoomById(rooms)

  const byDistanceSorter = sortRoomsByDistanceFromUsers(users)
  const byUsersAmountSorter = sortRoomsByCapacityAndUsersAmount(users.length)

  const sortEffects = [byDistanceSorter, byUsersAmountSorter]

  /*
   * For each sort effect we count how suitable is that particular room
   * Then we summarize that results and sort rooms similar to that summarized effect.
   */
  const roomsIndexes = sortEffects
    .map(sortEffect => sortEffect(rooms))
    .map(createRoomsIndexes)

  const sortedRoomsIndexes = compose(
    sortRoomsIndexes,
    transformRoomsIndexesObjectIntoArray,
    mergeRoomsIndexes
  )(roomsIndexes)

  const finalSortedRooms = sortedRoomsIndexes.map(index => {
    console.log(emptyEventsInRooms[index.key])
    const timeAvailable = emptyEventsInRooms[index.key] && emptyEventsInRooms[index.key].length > 0
      ? {
        dateStart: emptyEventsInRooms[index.key][0].dateStart,
        dateEnd: emptyEventsInRooms[index.key][0].dateEnd
      }
      : {}
    return merge(getRoom(index.key), timeAvailable)
  })
  console.log(finalSortedRooms)
  return finalSortedRooms
}
