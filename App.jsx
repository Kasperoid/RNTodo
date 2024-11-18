import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LogInPage} from './components/LogInPage';
import {HomePage} from './components/HomePage';
import {Provider} from 'react-redux';
import {store} from './redux/store';

export default function App() {
  const {Navigator, Screen} = createStackNavigator();
  return (
    <Provider store={store}>
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
        </Navigator>
      </NavigationContainer>
    </Provider>
  );
}
