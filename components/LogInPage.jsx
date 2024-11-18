import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {styles} from '../styles/styles';
import {ModalInfoWindow} from './ModalInfoWindow';
import {ButtonUI} from './UI/ButtonUI';
import {useDispatch, useSelector} from 'react-redux';
import {
  setErrorMessage,
  setIsError,
  setLoginInput,
  setPswdInput,
} from '../redux/slices/logInPageSlice';

export function LogInPage({navigation}) {
  const dispatch = useDispatch();
  const {logInInput, pswdInput, isError, errorMessage} = useSelector(
    store => store.logInPage,
  );

  function isRuEmail(str) {
    var emailText = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.ru$/);
    return emailText.test(str);
  }

  function logBtnHandler() {
    if (isRuEmail(logInInput)) {
      dispatch(setIsError(false));
      navigation.navigate('Home');
    } else {
      dispatch(setIsError(true));
      dispatch(setErrorMessage('Введите корректный e-mail'));
    }
  }

  function createBtnHandler() {
    if (isRuEmail(logInInput)) {
      dispatch(setIsError(false));
      navigation.navigate('Home');
    } else {
      dispatch(setIsError(true));
      dispatch(setErrorMessage('Введите корректный e-mail'));
    }
  }

  return (
    <View style={[styles.pageContainer, styles.pageContainerItemCenter]}>
      <ModalInfoWindow
        isOpened={isError}
        setCloseFunc={() => dispatch(setIsError(false))}
        message={errorMessage}
        title={'Ошибка'}
      />
      <View style={styles.logInContainer}>
        <Text
          style={[
            styles.titleH1,
            {
              textAlign: 'center',
            },
          ]}>
          Вход
        </Text>
        <View style={{gap: 10}}>
          <TextInput
            textContentType="emailAddress"
            onChangeText={text => dispatch(setLoginInput(text))}
            placeholder="Логин"
            style={styles.inputTextCustom}
            value={logInInput}
          />
          <TextInput
            textContentType="password"
            onChangeText={text => dispatch(setPswdInput(text))}
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
          <ButtonUI onPressFunc={createBtnHandler} type={'Secondary'}>
            Создать
          </ButtonUI>
        </View>
      </View>
    </View>
  );
}
