# Яндекс.Переговорки


<img height=500 src='https://pp.userapi.com/c621707/v621707431/5486e/0IIzkYfp0k0.jpg'/>


В **«Переговорках»** следующие зависимости:

* `preact` — просто попробовал
* `flow` — использую статическую типизацию в каждом проекте, чтобы меньше писать тестов.
* `parcel` — новая штука, тоже попробовал
* `fela` (css in js), плохой выбор — совершенно неуместно
* `redux` — must have
* `redux-saga` — потому что это лучшая реализация для работы асинхронными событиями в `redux`
* `lokka` — graphql client
* `preact-redux`
* `preact-router`
* `ramda` — фп
* `css modules`


> Стоит отметить, что заиспользовать новые хипстерские штуки было довольно опрометчивой идеей: в `parcel` на тот момент не работал `import .css`, а `preact-fela` вообще не собирался, так что пришлось закинуть им `PR` с фиксом. В итоге я недоволен этим решением, потому что потратил на это много времени. В этот раз я не использовал `boilerplate`, а собирал архитектуру руками. Всю библиотеку компонентов я тоже собрал руками, включая кнопки и инпуты.


> Кстати, когда будете смотреть приложение на мобильных, не забывайте обновлять страницу! Не всё сделано с помощью медиа-запросов.


## Второе задание
Второго задания нет. Я начал разработку с библиотеки компонентов, причём использовал там `css-in-js` подход. А портировать это как-то в чистый html и css, как это требуется в задании, сейчас видится мне очень сложным. В действительности, придётся очень много написать заного, поэтому я от этого отказался.


# Компоненты
  Я разберу самые интересные.

### rooms-timetable
+ [component](https://github.com/fletcherist/shri-2018-entrance-task-3/blob/master/src/components/rooms-timetable.js)
+ [container](https://github.com/fletcherist/shri-2018-entrance-task-3/blob/master/src/containers/rooms-timetable.js)
+ [алгоритм, который определяет свободное время](https://github.com/fletcherist/shri-2018-entrance-task-3/blob/master/src/utils/transformEvents.js)
+ [функция, которая считает длительность ивента в пикселах](https://github.com/fletcherist/shri-2018-entrance-task-3/blob/master/src/utils/transformEvents.js#L11)

Я решил отказаться от 15-минутных интервалов, это было бы очень просто. Все события располагаются на сетке с точностью до минуты.


#### Как

В начале у меня получилось что-то индийское на флексбоксе. Оно работало, но недостаточно производительно, потому что там приходилось слушать событие `onScroll`. В итоге я отказался от флексов и переписал на гридах.
Теперь всё работает хорошо. Но это только в хроме (читайте дальше в разделе, где я описываю баги)

#### Почему

Честно сказать, эта задача на вёрстку весьма нетривиальная (за что, кстати, спасибо), поэтому я не знаю, можно ли её решить каким-то более рациональным способом.


### event-tooltip
+ [component](https://github.com/fletcherist/shri-2018-entrance-task-3/blob/master/src/components/event-tooltip.js)
+ [container](https://github.com/fletcherist/shri-2018-entrance-task-3/blob/master/src/containers/event-tooltip.js)
+ [управление поведением](https://github.com/fletcherist/shri-2018-entrance-task-3/blob/master/src/sagas/modalsSaga.js#L12)

Наверное, самый сложный элемент интерфейса. Я делал такой первый раз.

#### Как

На каждое событие не свой отдельный `event-tooltip`, а он один на всё приложение. При клике на событие вычисляет абсолютные координаты ивента на сетке, и вычисляет такое положение тултипа, чтобы он всегда оказывался посередине ивента (см. гифку).

#### Почему

Использование данного подхода было оправдано тем, что вариант, где много на каждое событие своя модалка некорректно отображался на пересечении со списком комнат (транзитивно: `z-index` `списка` **>** `диаграммы`, поэтому всё, что находится в диаграмме, будет находиться **за списком**, сколько бы девяток мы там не писали)


<img height=300 src='https://i.imgur.com/7RBHJGn.gif'/>


### date-swticher
+ [component](https://github.com/fletcherist/shri-2018-entrance-task-3/blob/master/src/components/date-switcher.js)

+ [формат даты](https://github.com/fletcherist/shri-2018-entrance-task-3/blob/master/src/utils/formatTimeIntoDateSwitcher.js)

#### Почему

Я намеренно использовал здесь нативный календарь, чтобы показать, что мы должны пользоваться нативными браузерными средствами, потому что они ничуть не хуже кастомных, а даже лучше, отзывчивее и доступнее.


<img height=300 src='https://i.imgur.com/tOeZsRo.gif'/>

### Блок рекоммендаций (getRecommendation)

> а) Может быть, можно перенести встречу из неё в другую переговорку (например, меньших размеров). б) Если переговорки заняты не на весь период времени, стоит попробовать освободить одну из них, перенеся встречи в другие подходящие переговорки. Например, есть встреча с 11:00 до 12:00 и есть две подходящие переговорки А (занята с 11:00 до 11:30) и B (занята c 11:30 до 12:00).

#### Как
Я сделал подбор комнаты таким образом, чтобы в неё с одной стороны помещались люди (`usersAmount > roomCapacity`), а с другой — чтобы первыми показывались комнаты наименьших размеров. Кажется, что так можно решить описанную проблему перенаселения.


Комнаты сортируются по нескольим эффектам, на их основе им добавляются веса, а затем к каждой подбирается пустой промежуток времени, в который данную комнату можно занять.


Сама функция реализована **[вот здесь](https://github.com/fletcherist/shri-2018-entrance-task-3/blob/master/src/utils/getRecommendation.js)**


А вот результат работы:

<img height=300 src='https://pp.userapi.com/c841122/v841122166/5b12f/pqnXZvbXHus.jpg'/>

#### Почему
Я сделал так, потому что мне кажется, что комнаты заполняются неоптимально из-за того, что с самого начала неправильно советуются.


Когда человек вводит начало и конец бронирования, начинаем фильтровать комнаты, учитывая их занятость в данный период времени.


### Без инетрнета

Я обрабатываю кейс, когда выключен интернет или выключен сервер.


<img height=300 src='https://i.imgur.com/3AJbDd9.gif'/>

### Редактирование и создание встреч

<img height=300 src='https://i.imgur.com/B7SNXOB.gif' />
<img height=300 src='https://i.imgur.com/cOPzz7q.gif' />


### Баги (чтобы не искать)

1. В Сафари неправильно отображаются линии-разделители на сетке.

```css
  .eventsArea::before {
    ...
    background-image: repeating-linear-gradient(
      to right,
      transparent,
      transparent 64px,
      rgba(19,100,205,0.1) 64px,
      rgba(19,100,205,0.1) 65px
    );
    ...
  }
```


<img height=700 src='https://pp.userapi.com/c830709/v830709984/3eb39/vyETirJ9IuU.jpg'/>


2. В Сафари не работает нативный дейтпикер.

3. На десктопах рабочий день начинается с девяти. На мобильных — с восьми. Это связано с тем, что я не смог нормально это сверстать, у меня отметка в восемь часов накладывалась на `DateSwitcher`, поэтому я скрываю её на десктопе.


# Благодарность

Спасибо за по-настоящему сложное и интересное задание. Я с одной стороны был удивлён, а с другой — обрадовался, когда мне не удалось сделать его за выходные. 

