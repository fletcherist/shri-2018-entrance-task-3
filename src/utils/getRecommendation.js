//@flow

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

/*
 * 
 */
export function getRecommendation(
  rooms: roomType,
  users: usersType,
  events: eventsType,
): Array<roomType> {
  return []
}


getRecommendation(events)
