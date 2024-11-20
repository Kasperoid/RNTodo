import React from 'react';
import {Modal, View, Text} from 'react-native';
import {styles} from '../styles/styles';
import {ButtonUI} from './UI/ButtonUI';

export const ModalInfoWindow = ({isOpened, setCloseFunc, message, title}) => {
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
            {title}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              color: 'black',
            }}>
            {message}
          </Text>
          <ButtonUI onPressFunc={setCloseFunc} type={'Primary'}>
            Закрыть
          </ButtonUI>
        </View>
      </View>
    </Modal>
  );
};
