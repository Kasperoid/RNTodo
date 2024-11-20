import React, {useState} from 'react';
import {FlatList, Text, TouchableHighlight, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from '../styles/styles';
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {ButtonUI} from './UI/ButtonUI';
import {addNewTag} from '../redux/slices/tagsListSlice';

export const HomePage = () => {
  const addBtnClickHandler = () => {
    dispatch(
      addNewTag({
        id: Math.round(Math.random() * 100),
        title: tagInput,
      }),
    );
    setTagInput('');
  };

  const [tagInput, setTagInput] = useState('');
  const dispatch = useDispatch();
  const {tags} = useSelector(store => store.tagsList);
  return (
    <View style={styles.pageContainer}>
      <View>
        <Text>Добро пожаловать, имя_пользователя!</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
        }}>
        <FlatList
          data={tags}
          numColumns={2}
          renderItem={({item}) => (
            <TouchableHighlight
              activeOpacity={0.9}
              underlayColor={'#874f1e16'}
              onPress={() => console.log()}
              style={{
                width: 150,
                borderWidth: 1,
                borderRadius: 15,
                borderColor: '#e28533',
                padding: 10,
                marginHorizontal: 5,
                marginVertical: 5,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: 'black',
                }}>
                {item.title}
              </Text>
            </TouchableHighlight>
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <BottomSheet
        index={1}
        snapPoints={['5%', '20%', '50%']}
        style={styles.pageContainer}>
        <BottomSheetView
          style={{
            gap: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#e28533',
              fontWeight: 600,
              fontSize: 24,
            }}>
            Создай новый тег
          </Text>
          <BottomSheetTextInput
            style={styles.inputTextCustom}
            placeholder="Название"
            value={tagInput}
            onChangeText={text => setTagInput(text)}
          />
          <ButtonUI onPressFunc={() => addBtnClickHandler()} type="Primary">
            Добавить
          </ButtonUI>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};
