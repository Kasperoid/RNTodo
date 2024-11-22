import React from 'react';
import {Provider} from 'react-redux';
import store, {persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RoutesContainer} from './components/RoutesConatiner';

export default function App() {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <PersistGate loading={<Text>Загрузка...</Text>} persistor={persistor}>
          <RoutesContainer />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
