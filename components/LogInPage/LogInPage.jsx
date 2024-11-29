import React, {useCallback, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {styles} from '../../styles/styles';
import {ModalInfoWindow} from './../UI/ModalInfoWindow';
import {ButtonUI} from '../UI/ButtonUI';
import {useDispatch, useSelector} from 'react-redux';
import {clearError, getUser, setUser} from '../../redux/slices/userInfoSlice';
import {LoadingWindow} from '../UI/LoadingWindow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

export function LogInPage({navigation}) {
  const dispatch = useDispatch();
  const {isLoading, isError} = useSelector(state => state.userInfo);
  const [logInInput, setLoginInput] = useState('');
  const [pswdInput, setPswdInput] = useState('');

  function logBtnHandler() {
    dispatch(getUser({login: logInInput, pass: pswdInput}));
    if (!isError) {
      setLoginInput('');
      setPswdInput('');
      navigation.navigate('Home');
    }
  }

  function createBtnHandler() {
    dispatch(setUser({login: logInInput, pass: pswdInput}));
    setLoginInput('');
    if (!isError) {
      setPswdInput('');
      navigation.navigate('Home');
    }
  }

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.clear();
    }, []),
  );

  return (
    <View style={[styles.pageContainer, styles.pageContainerItemCenter]}>
      <ModalInfoWindow
        isOpened={Boolean(isError)}
        setCloseFunc={() => dispatch(clearError())}
        message={isError}
        title={'Ошибка'}
      />
      <View style={[styles.logInContainer]}>
        {isLoading && <LoadingWindow />}
        <Text
          style={[
            styles.titleH1,
            {
              textAlign: 'center',
              color: 'black',
            },
          ]}>
          Вход
        </Text>
        <View style={{gap: 10}}>
          <TextInput
            textContentType="emailAddress"
            onChangeText={text => setLoginInput(text)}
            placeholder="Логин"
            style={styles.inputTextCustom}
            value={logInInput}
          />
          <TextInput
            textContentType="password"
            onChangeText={text => setPswdInput(text)}
            value={pswdInput}
            placeholder="Пароль"
            style={styles.inputTextCustom}
          />
        </View>
        <View
          style={{
            gap: 10,
          }}>
          <ButtonUI onPressFunc={() => logBtnHandler()} type={'Primary'}>
            Войти
          </ButtonUI>
          <ButtonUI onPressFunc={() => createBtnHandler()} type={'Secondary'}>
            Создать
          </ButtonUI>
        </View>
      </View>
    </View>
  );
}
