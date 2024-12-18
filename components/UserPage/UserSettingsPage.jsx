import React, {useCallback, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {styles} from '../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {ModalInput} from '../UI/ModalInput';
import {
  changeUserNick,
  getUser,
  setUserAvatar,
  uploadAvatar,
} from '../../redux/slices/userInfoSlice';
import {LoadingWindow} from '../UI/LoadingWindow';
import {useFocusEffect} from '@react-navigation/native';
import {supabase} from '../../redux/store';
import {IconBtn} from '../UI/IconBtn';
import ImagePicker from 'react-native-image-crop-picker';
import {ButtonUI} from '../UI/ButtonUI';

export const UserSettingsPage = ({navigation}) => {
  const addNicknameBtnHandler = () => {
    dispatch(changeUserNick({id: activeUser.id, nickname: inputNickName}));
    setIsOpenModal(false);
    setInputNickName('');
  };

  const changeAvatarBtn = () => {
    ImagePicker.openPicker({
      width: 150,
      height: 150,
      cropping: true,
      cropperCircleOverlay: true,
      includeBase64: true,
    }).then(image => {
      dispatch(setUserAvatar(image.path));
      const fileData = image.data;
      const fileExt = image.path.split('.').at(-1);
      const mime = image.mime;
      dispatch(
        uploadAvatar({
          ext: fileExt,
          data: fileData,
          userId: activeUser.id,
          mime: mime,
        }),
      );
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const dispatch = useDispatch();
  const {activeUser, isLoading, activeUserAvatar} = useSelector(
    store => store.userInfo,
  );
  const [activeBtn, setActiveBtn] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [inputNickName, setInputNickName] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const descUser = supabase
        .channel('public:users')
        .on(
          'postgres_changes',
          {event: '*', schema: 'public', table: 'users'},
          () => {
            dispatch(getUser({id: activeUser.id}));
          },
        )
        .subscribe();
      return () => descUser.unsubscribe();
    }, [dispatch, activeUser.id]),
  );

  return (
    <View style={styles.pageContainer}>
      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
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
              gap: 15,
            }}>
            {activeUserAvatar ? (
              <Image
                source={{uri: activeUserAvatar}}
                style={{width: 150, height: 150, borderRadius: 150}}
              />
            ) : (
              <FontAwesome6 name="circle-user" size={128} color="#e28533" />
            )}

            <ButtonUI type={'Secondary'} onPressFunc={() => changeAvatarBtn()}>
              Изменить аватарку
            </ButtonUI>
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
      </ScrollView>
    </View>
  );
};
