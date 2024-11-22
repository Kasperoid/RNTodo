import React, {useState} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {styles} from '../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {ModalInput} from './ModalInput';
import {setUserNickname} from '../redux/slices/userInfoSlice';

export const UserSettingsPage = () => {
  const addNicknameBtnHandler = () => {
    setIsOpenModal(false);
    dispatch(setUserNickname(inputNickName));
  };
  const dispatch = useDispatch();
  const {activeUser} = useSelector(store => store.userInfo);
  const [activeBtn, setActiveBtn] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [inputNickName, setInputNickName] = useState('');
  const nickNameText = activeUser.nickName || '-';
  return (
    <View style={styles.pageContainer}>
      <ModalInput
        isOpened={isOpenModal}
        setCloseFunc={() => setIsOpenModal(false)}
        setChangeTextFunc={text => setInputNickName(text)}
        inputValue={inputNickName}
        btnFuncHandler={() => addNicknameBtnHandler()}
      />
      <View style={{gap: 15}}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <FontAwesome6 name="circle-user" size={128} color="#e28533" />
        </View>
        <View>
          <Text style={[{textAlign: 'center'}, styles.titleH1]}>
            О пользователе
          </Text>
          <View>
            <Text style={styles.commonText}>E-mail: {activeUser.login}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.commonText}>Nickname: {nickNameText}</Text>
              <TouchableHighlight
                underlayColor={null}
                onPressIn={() => setActiveBtn(true)}
                onPressOut={() => setActiveBtn(false)}
                onPress={() => setIsOpenModal(true)}>
                <AntDesign
                  name="edit"
                  size={18}
                  color={activeBtn ? '#e28533' : 'black'}
                />
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
