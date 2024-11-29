import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LogInPage} from '../LogInPage/LogInPage';
import {HomePage} from '../HomePage/HomePage';
import {TodosList} from '../TodosPage/TodosList';
import {UserSettingsPage} from '../UserPage/UserSettingsPage';
import {useSelector} from 'react-redux';
import {TodoDescPage} from './../TodoDescPage/TodoDescPage';

export const RoutesContainer = () => {
  const {Navigator, Screen} = createStackNavigator();
  const {activeUser} = useSelector(state => state.userInfo);
  return (
    <NavigationContainer>
      <Navigator initialRouteName={activeUser ? 'Home' : 'LogIn'}>
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
        <Screen
          name="UserSettings"
          options={{headerShown: false}}
          component={UserSettingsPage}
        />
        <Screen
          name="TodoDesc"
          options={{headerShown: false}}
          component={TodoDescPage}
        />
      </Navigator>
    </NavigationContainer>
  );
};
