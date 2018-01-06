//@flow
import {
  filter,
  sort,
  curry,
  compose,
  reduce,
  merge,
  mergeWith,
  sum
} from 'ramda'

const rooms = {
  "1": {
    "id": "1",
    "title": "404",
    "capacity": 5,
    "floor": 4
  },
  "2": {
    "id": "2",
    "title": "Деньги",
    "capacity": 4,
    "floor": 2
  },
  "3": {
    "id": "3",
    "title": "Карты",
    "capacity": 4,
    "floor": 2
  },
  "4": {
    "id": "4",
    "title": "Ствола",
    "capacity": 2,
    "floor": 2
  },
  "5": {
    "id": "5",
    "title": "14",
    "capacity": 6,
    "floor": 3
  }
}

const events = {
  "1": {
    "id": "1",
    "title": "ШРИ 2018 - начало",
    "dateStart": "2017-12-24T18:08:17.911Z",
    "dateEnd": "2017-12-24T19:08:17.911Z",
    "users": [
      {
        "id": "1",
        "username": "Sergey Berezhnoy",
        "avatarUrl": "https://avatars3.githubusercontent.com/u/15365?s=460&v=4"
      },
      {
        "id": "2",
        "username": "Andrey Morozov",
        "avatarUrl": "https://avatars1.githubusercontent.com/u/3763844?s=400&v=4"
      }
    ],
    "room": {
      "id": "1",
      "title": "404",
      "capacity": 5,
      "floor": 4
    }
  },
  "2": {
    "id": "2",
    "title": "👾 Хакатон 👾",
    "dateStart": "2017-12-24T19:08:17.911Z",
    "dateEnd": "2017-12-24T20:08:17.911Z",
    "users": [
      {
        "id": "2",
        "username": "Andrey Morozov",
        "avatarUrl": "https://avatars1.githubusercontent.com/u/3763844?s=400&v=4"
      },
      {
        "id": "3",
        "username": "Vasiliy",
        "avatarUrl": "https://avatars0.githubusercontent.com/u/1813468?s=460&v=4"
      }
    ],
    "room": {
      "id": "2",
      "title": "Деньги",
      "capacity": 4,
      "floor": 2
    }
  },
  "3": {
    "id": "3",
    "title": "🍨 Пробуем kefir.js",
    "dateStart": "2017-12-24T20:08:17.911Z",
    "dateEnd": "2017-12-24T21:08:17.911Z",
    "users": [
      {
        "id": "1",
        "username": "Sergey Berezhnoy",
        "avatarUrl": "https://avatars3.githubusercontent.com/u/15365?s=460&v=4"
      },
      {
        "id": "3",
        "username": "Vasiliy",
        "avatarUrl": "https://avatars0.githubusercontent.com/u/1813468?s=460&v=4"
      }
    ],
    "room": {
      "id": "3",
      "title": "Карты",
      "capacity": 4,
      "floor": 2
    }
  },
  "4": {
    "id": "4",
    "title": "Болтаем",
    "dateStart": "2017-10-10T05:00:00.000Z",
    "dateEnd": "2017-10-10T06:00:00.000Z",
    "users": [
      {
        "id": "1",
        "username": "Sergey Berezhnoy",
        "avatarUrl": "https://avatars3.githubusercontent.com/u/15365?s=460&v=4"
      }
    ],
    "room": {
      "id": "1",
      "title": "404",
      "capacity": 5,
      "floor": 4
    }
  },
  "5": {
    "id": "5",
    "title": "123",
    "dateStart": "2017-12-29T10:00:00.000Z",
    "dateEnd": "2017-12-29T12:30:00.000Z",
    "users": [
      {
        "id": "2",
        "username": "Andrey Morozov",
        "avatarUrl": "https://avatars1.githubusercontent.com/u/3763844?s=400&v=4"
      }
    ],
    "room": {
      "id": "1",
      "title": "404",
      "capacity": 5,
      "floor": 4
    }
  },
  "6": {
    "id": "6",
    "title": "123",
    "dateStart": "2017-12-29T05:00:00.000Z",
    "dateEnd": "2017-12-29T06:00:00.000Z",
    "users": [
      {
        "id": "3",
        "username": "Vasiliy",
        "avatarUrl": "https://avatars0.githubusercontent.com/u/1813468?s=460&v=4"
      }
    ],
    "room": {
      "id": "1",
      "title": "404",
      "capacity": 5,
      "floor": 4
    }
  }
}

const users = {
  "1": {
    "id": "1",
    "login": "vegeddd",
    "homeFloor": 0,
    "avatarUrl": "https://avatars3.githubusercontent.com/u/15365?s=460&v=4",
    "username": "Sergey Berezhnoy"
  },
  "2": {
    "id": "2",
    "login": "alt-j",
    "homeFloor": 3,
    "avatarUrl": "https://avatars1.githubusercontent.com/u/3763844?s=400&v=4",
    "username": "Andrey Morozov"
  },
  "3": {
    "id": "3",
    "login": "yeti-or",
    "homeFloor": 2,
    "avatarUrl": "https://avatars0.githubusercontent.com/u/1813468?s=460&v=4",
    "username": "Vasiliy"
  }
}

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

/*
 * This function finds most suitable rooms for booking
 * 
 * rooms All available rooms
 * users Event's participants
 * events All events on that particular date
 */
export function getRecommendation(
  rooms: roomsType,
  users: usersType,
  events: eventsType
): Array<roomType> {
  /* transforming rooms object to rooms array */
  rooms = Object.values(rooms)
  /* transforming users object to users array */
  users = Object.values(users)

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
  console.log(roomsIndexes)

  const sortedRoomsIndexes = compose(
    sortRoomsIndexes,
    transformRoomsIndexesObjectIntoArray,
    mergeRoomsIndexes
  )(roomsIndexes)

  return sortedRoomsIndexes.map(index => getRoom(index.key))
}


getRecommendation(rooms, users, events)
