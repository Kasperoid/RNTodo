import React from 'react';
import {Modal, Text, TextInput, View} from 'react-native';
import {styles} from '../styles/styles';
import {ButtonUI} from './UI/ButtonUI';

export const ModalAddTodo = ({
  isOpened,
  setCloseFunc,
  setChangeTextFunc,
  inputValue,
  btnFuncHandler,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpened}
      onRequestClose={setCloseFunc}>
      <View style={styles.modalBackground}>
        <View style={styles.modalInnerContainer}>
          <Text
            style={[
              {
                textAlign: 'center',
              },
              styles.titleH1,
            ]}>
            Добавление
          </Text>
          <TextInput
            onChangeText={setChangeTextFunc}
            placeholder="Новая задача"
            style={styles.inputTextCustom}
            value={inputValue}
          />
          <ButtonUI onPressFunc={btnFuncHandler} type={'Primary'}>
            Добавить
          </ButtonUI>
        </View>
      </View>
    </Modal>
  );
};
