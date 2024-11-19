import {enablePromise, openDatabase} from 'react-native-sqlite-storage';

const tableName = 'todoData';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({
    name: 'todo-proj.db',
  });
  // Для Android каталог www всегда относится к каталогу assets приложения: src/main/assets
};

export const createTable = async db => {
  // Если таблицы нет, то создать её
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        value TEXT NOT NULL
    );`; // Запрос в бд

  await db.executeSql(query); // Получить данные по запросу
};

export const getTodoItems = async db => {
  // Получение массива тудушек
  try {
    const todoItems = [];
    const results = await db.executeSql(`SELECT * FROM ${tableName}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        todoItems.push(result.rows.item(index));
      }
    });
    return todoItems;
  } catch (error) {
    console.error(error);
    throw Error('Ошибка получения данных!');
  }
};

export const saveTodoItems = async (db, todoItems) => {
  // Сохранить в бд тудушку
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
    todoItems.map(i => `(${i.id}, '${i.value}')`).join(',');

  return db.executeSql(insertQuery);
};

export const deleteTodoItem = async (db, id) => {
  // Удалить из бд тудушку
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async db => {
  // Удалить таблицу
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};
