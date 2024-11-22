import React, {useCallback, useEffect} from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from '../styles/styles';
import {setActiveTags, setSelectedTag} from '../redux/slices/tagsListSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {IconBtn} from './IconBtn';
import {setActiveUser} from '../redux/slices/userInfoSlice';
import {BottomMenu} from './BottomMenu';

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
  const {tags, activeTags} = useSelector(store => store.tagsList);
  const {activeUser} = useSelector(store => store.userInfo);

  const visibleName = activeUser?.nickName || activeUser?.login;

  useEffect(() => {
    dispatch(setActiveTags(activeUser?.id));
  }, [tags, dispatch, activeUser?.id]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

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
      <View
        style={{
          alignItems: 'center',
        }}>
        {activeTags && activeTags.length !== 0 ? (
          <FlatList
            data={activeTags}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableHighlight
                activeOpacity={0.9}
                underlayColor={'#874f1e16'}
                onPress={() => onTagBtnHandler(item.id)}
                style={[{backgroundColor: 'white'}, styles.tagBtn]}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <AntDesign name={item.icon} size={16} color={item.color} />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: 'black',
                    }}>
                    {item.title}
                  </Text>
                </View>
              </TouchableHighlight>
            )}
          />
        ) : (
          <Text style={{color: 'black', fontWeight: 600}}>
            У тебя пока нет категорий...
          </Text>
        )}
      </View>
      <BottomMenu />
    </View>
  );
};
