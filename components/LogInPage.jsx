import React from 'react';
import {View, Text} from 'react-native';
import {Pressable, TextInput} from 'react-native-gesture-handler';
import {styles} from '../styles/styles';

export function LogInPage() {
  return (
    <View style={[styles.pageContainer, styles.pageContainerItemCenter]}>
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
          <TextInput placeholder="Логин" style={styles.inputTextCustom} />
          <TextInput placeholder="Пароль" style={styles.inputTextCustom} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 35,
          }}>
          <Pressable
            onPress={() => console.log()}
            style={({pressed}) => [
              {
                borderColor: 'white',
                backgroundColor: pressed ? '#9c5a20' : '#e28533',
              },
              styles.button,
            ]}>
            <Text
              style={[
                {
                  color: 'white',
                },
                styles.textButton,
              ]}>
              Войти
            </Text>
          </Pressable>
          <Pressable
            onPress={() => console.log()}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#faf7f3' : 'white',
                borderColor: '#e28533',
              },
              styles.button,
            ]}>
            <Text style={styles.textButton}>Создать</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
