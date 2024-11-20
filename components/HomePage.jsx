import React, {useState} from 'react';
import {FlatList, Image, Text, TouchableHighlight, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from '../styles/styles';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {ButtonUI} from './UI/ButtonUI';
import {addNewTag} from '../redux/slices/tagsListSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colorsSelection, iconsSelection} from '../data/data';

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
  const [selectColorTag, setSelectColorTag] = useState(null);
  const dispatch = useDispatch();
  const {tags} = useSelector(store => store.tagsList);
  const {activeUser} = useSelector(store => store.userInfo);
  const visibleName = activeUser?.nickName || activeUser.login;
  return (
    <View style={styles.pageContainer}>
      <View style={{alignItems: 'flex-start'}}>
        <TouchableHighlight
          underlayColor={'#874f1e16'}
          onPress={() => console.log('!!!')}
          style={{
            backgroundColor: 'white',
            borderWidth: 1,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
            borderColor: '#e28533',
          }}>
          {activeUser?.avatar ? (
            <Image source={activeUser.avatar} />
          ) : (
            <MaterialIcons name="account" size={32} color="#e28533" />
          )}
        </TouchableHighlight>
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
        <FlatList
          data={tags}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableHighlight
              activeOpacity={0.9}
              underlayColor={'#874f1e16'}
              onPress={() => console.log()}
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
              <BottomSheetFlatList
                data={colorsSelection}
                numColumns={Math.ceil(colorsSelection.length / 2)}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <TouchableHighlight
                    activeOpacity={0.9}
                    underlayColor={'#874f1e16'}
                    onPress={() => setSelectColorTag(item.color)}
                    style={{
                      padding: 10,
                      borderWidth: 1,
                      borderRadius: 30,
                      margin: 5,
                      borderColor: '#e28533',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <AntDesign
                        name={selectIconTag}
                        size={16}
                        color={item.color}
                      />
                    </View>
                  </TouchableHighlight>
                )}
              />
              <BottomSheetFlatList
                data={iconsSelection}
                numColumns={Math.ceil(iconsSelection.length / 2)}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <TouchableHighlight
                    activeOpacity={0.9}
                    underlayColor={'#874f1e16'}
                    onPress={() => setSelectIconTag(item.title)}
                    style={{
                      padding: 10,
                      borderWidth: 1,
                      borderRadius: 30,
                      margin: 5,
                      borderColor: '#e28533',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <AntDesign
                        name={item.title}
                        size={16}
                        color={selectColorTag}
                      />
                    </View>
                  </TouchableHighlight>
                )}
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
