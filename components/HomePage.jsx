import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from '../styles/styles';
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {ButtonUI} from './UI/ButtonUI';
import {
  addNewTag,
  setActiveTags,
  setSelectedTag,
} from '../redux/slices/tagsListSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colorsSelection, iconsSelection} from '../data/data';
import {SelectionTagList} from './SelectionTagList';
import {AvatarBtn} from './AvatarBtn';
import {setActiveUser} from '../redux/slices/userInfoSlice';

export const HomePage = ({navigation}) => {
  const addBtnClickHandler = () => {
    dispatch(
      addNewTag({
        id: Math.round(Math.random() * 100),
        title: tagInput,
        userId: activeUser.id,
        color: selectColorTag,
        icon: selectIconTag,
      }),
    );
    setTagInput('');
  };

  const onTagBtnHandler = tagId => {
    dispatch(setSelectedTag(tagId));
    navigation.navigate('TodosList');
  };

  const openBottomMenuBtnHandler = () => {
    isBottomVisible
      ? bottomMenuRef.current.snapToIndex(0)
      : bottomMenuRef.current.expand();

    isBottomVisible
      ? bottomInputRef.current.blur()
      : bottomInputRef.current.focus();

    setIsBottomVisible(prevState => !prevState);
  };

  const onChangeBottomMenu = index => {
    if (index === 3) {
      bottomInputRef.current.focus();
      setIsBottomVisible(true);
    } else {
      bottomInputRef.current.blur();
      setIsBottomVisible(false);
    }
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

  const [tagInput, setTagInput] = useState('');
  const [selectIconTag, setSelectIconTag] = useState('tag');
  const [selectColorTag, setSelectColorTag] = useState('grey');
  const [isBottomVisible, setIsBottomVisible] = useState(false);

  const dispatch = useDispatch();
  const {tags, activeTags} = useSelector(store => store.tagsList);
  const {activeUser} = useSelector(store => store.userInfo);

  const bottomMenuRef = useRef(null);
  const bottomInputRef = useRef(null);

  const visibleName = activeUser?.nickName || activeUser?.login;

  useEffect(() => {
    dispatch(setActiveTags(activeUser?.id));
  }, [tags, dispatch, activeUser?.id]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [backAction]);

  return (
    <View style={styles.pageContainer}>
      <AvatarBtn
        userAvatar={activeUser?.avatar}
        btnPressFunc={() => navigation.navigate('UserSettings')}
      />
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
      <BottomSheet
        onChange={onChangeBottomMenu}
        ref={bottomMenuRef}
        index={1}
        snapPoints={['10%', '20%', '60%']}
        style={styles.pageContainer}>
        <BottomSheetView
          style={{
            gap: 10,
          }}>
          <View style={{alignItems: 'center'}}>
            <TouchableHighlight
              underlayColor={'#874f1e16'}
              style={{borderRadius: 15}}
              onPress={openBottomMenuBtnHandler}>
              <Text
                style={[
                  styles.titleH1,
                  {
                    textAlign: 'center',
                    color: '#e28533',
                    marginBottom: 0,
                    padding: 10,
                  },
                ]}>
                Создай новый тег
              </Text>
            </TouchableHighlight>
          </View>
          <BottomSheetTextInput
            ref={bottomInputRef}
            style={styles.inputTextCustom}
            placeholder="Название"
            value={tagInput}
            onChangeText={text => setTagInput(text)}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <AntDesign
                name={selectIconTag}
                size={64}
                color={selectColorTag}
              />
            </View>
            <View>
              <SelectionTagList
                data={colorsSelection}
                setFunc={setSelectColorTag}
                type={'color'}
                selectType={selectIconTag}
              />
              <SelectionTagList
                data={iconsSelection}
                setFunc={setSelectIconTag}
                type={'icon'}
                selectType={selectColorTag}
              />
            </View>
          </View>
          <ButtonUI onPressFunc={() => addBtnClickHandler()} type="Primary">
            Добавить
          </ButtonUI>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};
