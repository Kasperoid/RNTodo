import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableHighlight, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from '../styles/styles';
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {ButtonUI} from './UI/ButtonUI';
import {addNewTag, setActiveTags} from '../redux/slices/tagsListSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colorsSelection, iconsSelection} from '../data/data';
import {SelectionTagList} from './SelectionTagList';
import {AvatarBtn} from './AvatarBtn';

export const HomePage = () => {
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

  const [tagInput, setTagInput] = useState('');
  const [selectIconTag, setSelectIconTag] = useState('tag');
  const [selectColorTag, setSelectColorTag] = useState('grey');
  const dispatch = useDispatch();
  const {tags, activeTags} = useSelector(store => store.tagsList);
  const {activeUser} = useSelector(store => store.userInfo);
  const visibleName = activeUser?.nickName || activeUser.login;

  useEffect(() => {
    dispatch(setActiveTags(activeUser.id));
  }, [tags, dispatch, activeUser.id]);
  return (
    <View style={styles.pageContainer}>
      <AvatarBtn userAvatar={activeUser?.avatar} />
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
        {activeTags.length !== 0 ? (
          <FlatList
            data={activeTags}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableHighlight
                activeOpacity={0.9}
                underlayColor={'#874f1e16'}
                onPress={() => console.log(item.id)}
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
        index={1}
        snapPoints={['10%', '20%', '60%']}
        style={styles.pageContainer}>
        <BottomSheetView
          style={{
            gap: 10,
          }}>
          <Text
            style={[
              styles.titleH1,
              {
                textAlign: 'center',
                color: '#e28533',
              },
            ]}>
            Создай новый тег
          </Text>
          <BottomSheetTextInput
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
