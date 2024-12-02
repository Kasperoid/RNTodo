import React, {useCallback, useEffect} from 'react';
import {Alert, BackHandler, Image, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from '../../styles/styles';
import {
  clearSelectedTag,
  getTags,
  setSelectedTag,
} from '../../redux/slices/tagsListSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {BottomMenu} from './BottomMenu';
import {useFocusEffect} from '@react-navigation/native';
import {TagsHomeList} from './TagsHomeList';
import {supabase} from '../../redux/store';
import {LoadingWindow} from '../UI/LoadingWindow';
import {IconBtn} from '../UI/IconBtn';
import {ButtonUI} from '../UI/ButtonUI';
import {downloadAvatar} from '../../redux/slices/userInfoSlice';
import {
  clearNewTodoId,
  setNewTodoImgSettings,
  uploadTodoImg,
} from '../../redux/slices/todosListSlice';

export const HomePage = ({navigation}) => {
  const onTagBtnHandler = tagId => {
    dispatch(setSelectedTag(activeTags.filter(todo => todo.id === tagId)[0]));
    navigation.navigate('TodosList');
  };

  const exitBtnHandler = useCallback(() => {
    Alert.alert('Стойте!', 'Вы действительно хотите выйти из аккаунта?', [
      {
        text: 'Да',
        onPress: () => {
          navigation.navigate('LogIn');
        },
      },
      {
        text: 'Нет',
        onPress: () => null,
        style: 'cancel',
      },
    ]);
  }, [navigation]);

  const backAction = useCallback(() => {
    Alert.alert('Стойте!', 'Вы действительно хотите выйти из приложения?', [
      {text: 'Да', onPress: BackHandler.exitApp},
      {
        text: 'Нет',
        onPress: () => null,
        style: 'cancel',
      },
    ]);
    return true;
  }, []);

  const dispatch = useDispatch();
  const {newTodoId, newTodoImgSettings} = useSelector(state => state.todosList);
  const {activeUser, activeUserAvatar} = useSelector(store => store.userInfo);
  const {isLoading: isLoadingTag, activeTags} = useSelector(
    store => store.tagsList,
  );
  const visibleName = activeUser?.nickname || activeUser?.login;

  useEffect(() => {
    dispatch(getTags(activeUser.id));
    dispatch(downloadAvatar({userId: activeUser.id}));
  }, [dispatch, activeUser?.id]);

  useEffect(() => {
    const tags = supabase
      .channel('public:tags')
      .on(
        'postgres_changes',
        {event: '*', schema: 'public', table: 'tags'},
        () => {
          dispatch(getTags(activeUser?.id));
        },
      )
      .subscribe();
    return () => tags.unsubscribe();
  }, [dispatch, activeUser?.id]);

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, [backAction]),
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(clearSelectedTag());
      if (newTodoId) {
        dispatch(uploadTodoImg({todoId: newTodoId, ...newTodoImgSettings}));
        dispatch(setNewTodoImgSettings(null));
        dispatch(clearNewTodoId());
      }
    }, [dispatch, newTodoId, newTodoImgSettings]),
  );

  return (
    <View style={styles.pageContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <IconBtn
          iconComp={
            activeUserAvatar ? (
              <Image
                source={{uri: activeUserAvatar}}
                style={{height: 32, width: 32, borderRadius: 15}}
              />
            ) : (
              <FontAwesome6 name="circle-user" size={32} color="#e28533" />
            )
          }
          btnPressFunc={() => navigation.navigate('UserSettings')}
        />
        <ButtonUI
          type={'Primary'}
          onPressFunc={() => navigation.navigate('CreateTodo')}>
          Создать задачу
        </ButtonUI>
        <IconBtn
          iconComp={<AntDesign name="logout" size={32} color="#e28533" />}
          btnPressFunc={() => exitBtnHandler()}
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
      {isLoadingTag && <LoadingWindow />}
      <TagsHomeList onTagBtnHandler={onTagBtnHandler} />
      <BottomMenu />
    </View>
  );
};
