export const todosData = [
  {
    id: Math.round(Math.random() * 100),
    userId: 101,
    title: 'delectus aut autem',
    completed: false,
    tags: [112],
  },
  {
    id: Math.round(Math.random() * 100),
    userId: 102,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
    tags: [110],
  },
  {
    id: Math.round(Math.random() * 100),
    userId: 102,
    title: 'fugiat veniam minus',
    completed: false,
    tags: [111],
  },
  {
    id: Math.round(Math.random() * 100),
    userId: 102,
    title: 'et porro tempora',
    completed: true,
    tags: [112, 110],
  },
  {
    id: Math.round(Math.random() * 100),
    userId: 101,
    title: 'laboriosam mollitia et enim quasi adipisci quia provident illumdwa',
    completed: false,
    tags: [114],
  },
];

export const tagsData = [
  {
    id: 110,
    userId: 102,
    title: 'Избранное',
    color: 'red',
    icon: 'tag',
  },
  {
    id: 111,
    userId: 102,
    title: 'Работа',
    color: 'black',
    icon: 'meho',
  },
  {
    id: 112,
    userId: 101,
    title: 'Учеба',
    color: 'blue',
    icon: 'book',
  },
  {
    id: 113,
    userId: 102,
    title: 'Прочее',
    color: 'orange',
    icon: 'cloud',
  },
  {
    id: 114,
    userId: 101,
    title: 'Задачи',
    color: 'yellow',
    icon: 'questioncircle',
  },
];

// в качестве id - почта

export const usersData = [
  {id: 101, pass: '1234', login: 'ivanu9053@gmail.ru'},
  {id: 102, nickName: 'Dima', pass: '4321', login: 'dimad5642@mail.ru'},
];

export const colorsSelection = [
  {id: Math.round(Math.random() * 100), title: 'Красный', color: 'red'},
  {id: Math.round(Math.random() * 100), title: 'Черный', color: 'black'},
  {id: Math.round(Math.random() * 100), title: 'Синий', color: 'blue'},
  {id: Math.round(Math.random() * 100), title: 'Желтый', color: 'yellow'},
  {id: Math.round(Math.random() * 100), title: 'Серый', color: 'grey'},
  {id: Math.round(Math.random() * 100), title: 'Розовый', color: 'pink'},
  {id: Math.round(Math.random() * 100), title: 'Оранжевый', color: 'cyan'},
  {id: Math.round(Math.random() * 100), title: 'Оранжевый', color: 'lightblue'},
  {id: Math.round(Math.random() * 100), title: 'Оранжевый', color: 'green'},
  {id: Math.round(Math.random() * 100), title: 'Оранжевый', color: 'lighgreen'},
  {id: Math.round(Math.random() * 100), title: 'Оранжевый', color: 'purple'},
  {id: Math.round(Math.random() * 100), title: 'Оранжевый', color: 'gold'},
];

export const iconsSelection = [
  {id: Math.round(Math.random() * 100), title: 'tag'},
  {id: Math.round(Math.random() * 100), title: 'book'},
  {id: Math.round(Math.random() * 100), title: 'questioncircle'},
  {id: Math.round(Math.random() * 100), title: 'meho'},
  {id: Math.round(Math.random() * 100), title: 'cloud'},
  {id: Math.round(Math.random() * 100), title: 'eye'},
  {id: Math.round(Math.random() * 100), title: 'smile-circle'},
];
