import React, {useCallback, useEffect} from 'react';
import {Alert, BackHandler, Image, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from '../styles/styles';
import {setActiveTags, setSelectedTag} from '../redux/slices/tagsListSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {IconBtn} from './IconBtn';
import {setActiveUser} from '../redux/slices/userInfoSlice';
import {BottomMenu} from './BottomMenu';
import {useFocusEffect} from '@react-navigation/native';
import {TagsHomeList} from './TagsHomeList';

export const HomePage = ({navigation}) => {
  const onTagBtnHandler = tagId => {
    dispatch(setSelectedTag(tagId));
    navigation.navigate('TodosList');
  };

  const exitBtnHandler = useCallback(() => {
    navigation.navigate('LogIn');
    dispatch(setActiveUser(null));
  }, [navigation, dispatch]);

  const backAction = useCallback(() => {
    Alert.alert('Стойте!', 'Вы действительно хотите выйти?', [
      {text: 'Да', onPress: exitBtnHandler},
      {
        text: 'Нет',
        onPress: () => null,
        style: 'cancel',
      },
    ]);
    return true;
  }, [exitBtnHandler]);

  const dispatch = useDispatch();
  const {tags} = useSelector(store => store.tagsList);
  const {activeUser} = useSelector(store => store.userInfo);

  const visibleName = activeUser?.nickName || activeUser?.login;

  useEffect(() => {
    dispatch(setActiveTags(activeUser?.id));
  }, [tags, dispatch, activeUser?.id]);

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, [backAction]),
  );

  return (
    <View style={styles.pageContainer}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <IconBtn
          iconComp={
            activeUser?.avatar ? (
              <Image source={activeUser.avatar} />
            ) : (
              <FontAwesome6 name="circle-user" size={32} color="#e28533" />
            )
          }
          btnPressFunc={() => navigation.navigate('UserSettings')}
        />
        <IconBtn
          iconComp={<AntDesign name="logout" size={32} color="#e28533" />}
          btnPressFunc={() => backAction()}
        />
      </View>
      <View>
        <Text
          style={[
            {
              textAlign: 'center',
            },
            styles.titleH1,
          ]}>
          Добро пожаловать, {visibleName}!
        </Text>
      </View>
      <TagsHomeList onTagBtnHandler={onTagBtnHandler} />
      <BottomMenu />
    </View>
  );
};
