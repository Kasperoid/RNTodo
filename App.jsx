import React, {useCallback, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LogInPage} from './components/LogInPage';
import {Provider} from 'react-redux';
import store, {persistor} from './redux/store';
import {TodosList} from './components/TodosList';
import {HomePage} from './components/HomePage';
import {PersistGate} from 'redux-persist/integration/react';
import {Text} from 'react-native';
// import {
//   createTable,
//   getDBConnection,
//   getTodoItems,
//   saveTodoItems,
// } from './db/db-service';

export default function App() {
  //   const loadDataCallback = useCallback(async () => {
  //     try {
  //       // const initTodos = [
  //       //   {id: 0, value: 'go to shop'},
  //       //   {id: 1, value: 'eat at least a one healthy foods'},
  //       //   {id: 2, value: 'Do some exercises'},
  //       // ];
  //       const db = await getDBConnection();
  //       const storedTodoItems = await getTodoItems(db);
  //       console.log(db);
  //       console.log(storedTodoItems);
  //       // await createTable(db);
  //       // const storedTodoItems = await getTodoItems(db);
  //       // if (storedTodoItems.length) {
  //       //   // setTodos(storedTodoItems);
  //       // } else {
  //       //   await saveTodoItems(db, initTodos);
  //       //   // setTodos(initTodos);
  //       // }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }, []);

  //   useEffect(() => {
  //     loadDataCallback();
  //   }, [loadDataCallback]);

  const {Navigator, Screen} = createStackNavigator();
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Загрузка...</Text>} persistor={persistor}>
        <NavigationContainer>
          <Navigator initialRouteName="LogIn">
            <Screen
              name="LogIn"
              component={LogInPage}
              options={{headerShown: false}}
            />
            <Screen
              name="Home"
              options={{headerShown: false}}
              component={HomePage}
            />
            <Screen
              name="TodosList"
              options={{headerShown: false}}
              component={TodosList}
            />
          </Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
