import React, {useState} from 'react';
import {Modal, Text, TextInput, TouchableHighlight, View} from 'react-native';
import {styles} from '../../styles/styles';
import {ButtonUI} from '../UI/ButtonUI';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const ModalInput = ({
  isOpened,
  setCloseFunc,
  setChangeTextFunc,
  inputValue,
  btnFuncHandler,
}) => {
  const [activeBtn, setActiveBtn] = useState(false);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpened}
      onRequestClose={setCloseFunc}>
      <View style={styles.modalBackground}>
        <View style={styles.modalInnerContainer}>
          <TouchableHighlight
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
            }}
            underlayColor={null}
            onPressIn={() => setActiveBtn(true)}
            onPressOut={() => setActiveBtn(false)}
            onPress={setCloseFunc}>
            <AntDesign
              name="close"
              size={22}
              color={activeBtn ? '#e28533' : 'black'}
            />
          </TouchableHighlight>
          <Text
            style={[
              {
                textAlign: 'center',
              },
              styles.titleH1,
            ]}>
            Создание
          </Text>
          <TextInput
            onChangeText={setChangeTextFunc}
            placeholder="Новая запись"
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
