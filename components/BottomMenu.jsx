import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {useCallback, useRef, useState} from 'react';
import {TouchableHighlight, View, Text} from 'react-native';
import {styles} from '../styles/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SelectionTagList} from './SelectionTagList';
import {ButtonUI} from './UI/ButtonUI';
import {useDispatch, useSelector} from 'react-redux';
import {addNewTag} from '../redux/slices/tagsListSlice';
import {colorsSelection, iconsSelection} from '../data/data';
import uuid from 'react-native-uuid';

export const BottomMenu = () => {
  const addBtnClickHandler = () => {
    dispatch(
      addNewTag({
        id: uuid.v4(),
        title: tagInput,
        userId: activeUser.id,
        color: selectColorTag,
        icon: selectIconTag,
      }),
    );
    setTagInput('');
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

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        appearsOnIndex={1}
        disappearsOnIndex={0}
        opacity={0.3}
        {...props}
        pressBehavior={'collapse'}
      />
    ),
    [],
  );

  const dispatch = useDispatch();

  const {activeUser} = useSelector(store => store.userInfo);

  const [tagInput, setTagInput] = useState('');
  const [selectIconTag, setSelectIconTag] = useState('tag');
  const [selectColorTag, setSelectColorTag] = useState('grey');
  const [isBottomVisible, setIsBottomVisible] = useState(false);

  const bottomMenuRef = useRef(null);
  const bottomInputRef = useRef(null);

  return (
    <BottomSheet
      backdropComponent={renderBackdrop}
      onChange={onChangeBottomMenu}
      ref={bottomMenuRef}
      index={0}
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
            <AntDesign name={selectIconTag} size={64} color={selectColorTag} />
          </View>
          <View style={{flex: 1}}>
            <SelectionTagList
              data={colorsSelection}
              setFunc={setSelectColorTag}
              type={'color'}
              selectType={selectIconTag}
            />
            <View style={styles.separator} />
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
  );
};
