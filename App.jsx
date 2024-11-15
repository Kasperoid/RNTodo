import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LogInPage} from './components/LogInPage';

export default function App() {
  const {Navigator, Screen} = createStackNavigator();
  return (
    <NavigationContainer>
      <Navigator initialRouteName="LogIn">
        <Screen name="LogIn" component={LogInPage} options={{title: 'Вход'}} />
      </Navigator>
    </NavigationContainer>
  );
}
