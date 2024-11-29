import React, {useCallback, useState} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {styles} from '../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {ModalInput} from '../UI/ModalInput';
import {changeUserNick, getUser} from '../../redux/slices/userInfoSlice';
import {LoadingWindow} from '../UI/LoadingWindow';
import {useFocusEffect} from '@react-navigation/native';
import {supabase} from '../../redux/store';
import {IconBtn} from '../UI/IconBtn';

export const UserSettingsPage = ({navigation}) => {
  const addNicknameBtnHandler = () => {
    dispatch(changeUserNick({id: activeUser.id, nickname: inputNickName}));
    setIsOpenModal(false);
    setInputNickName('');
  };
  const dispatch = useDispatch();
  const {activeUser, isLoading} = useSelector(store => store.userInfo);
  const [activeBtn, setActiveBtn] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [inputNickName, setInputNickName] = useState('');

  useFocusEffect(
    useCallback(() => {
      const tags = supabase
        .channel('public:users')
        .on(
          'postgres_changes',
          {event: '*', schema: 'public', table: 'users'},
          () => {
            dispatch(getUser({id: activeUser.id}));
          },
        )
        .subscribe();
      return () => tags.unsubscribe();
    }, [dispatch, activeUser.id]),
  );
  return (
    <View style={styles.pageContainer}>
      {isLoading && <LoadingWindow />}
      <ModalInput
        isOpened={isOpenModal}
        setCloseFunc={() => setIsOpenModal(false)}
        setChangeTextFunc={text => setInputNickName(text)}
        inputValue={inputNickName}
        btnFuncHandler={() => addNicknameBtnHandler()}
      />
      <IconBtn
        iconComp={<AntDesign name="back" size={32} color="#e28533" />}
        btnPressFunc={() => navigation.goBack()}
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
              <Text style={styles.commonText}>
                Nickname: {activeUser.nickname || '-'}
              </Text>
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
