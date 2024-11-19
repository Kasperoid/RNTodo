import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {styles} from '../styles/styles';
import {ModalInfoWindow} from './ModalInfoWindow';
import {ButtonUI} from './UI/ButtonUI';

export function LogInPage({navigation}) {
  const [logInInput, setLoginInput] = useState('');
  const [pswdInput, setPswdInput] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function isRuEmail(str) {
    var emailText = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.ru$/);
    return emailText.test(str);
  }

  function logBtnHandler() {
    if (isRuEmail(logInInput)) {
      setIsError(false);
      navigation.navigate('Home');
    } else {
      setIsError(true);
      setErrorMessage('Введите корректный e-mail');
    }
  }

  function createBtnHandler() {
    if (isRuEmail(logInInput)) {
      setIsError(false);
      navigation.navigate('Home');
    } else {
      setIsError(true);
      setErrorMessage('Введите корректный e-mail');
    }
  }

  return (
    <View style={[styles.pageContainer, styles.pageContainerItemCenter]}>
      <ModalInfoWindow
        isOpened={isError}
        setCloseFunc={() => setIsError(false)}
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
          <ButtonUI onPressFunc={createBtnHandler} type={'Secondary'}>
            Создать
          </ButtonUI>
        </View>
      </View>
    </View>
  );
}
