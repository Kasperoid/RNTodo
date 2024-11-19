import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LogInPage} from './components/LogInPage';
import {Provider} from 'react-redux';
import store, {persistor} from './redux/store';
import {TodosList} from './components/TodosList';
import {HomePage} from './components/HomePage';
import {PersistGate} from 'redux-persist/integration/react';
import {Text} from 'react-native';

export default function App() {
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
