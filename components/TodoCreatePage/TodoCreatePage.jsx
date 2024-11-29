import React, {useCallback, useState} from 'react';
import {
  BackHandler,
  FlatList,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {styles} from '../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  changeTag,
  clearSelectedTag,
  setSelectedTag,
} from '../../redux/slices/tagsListSlice';
import {ButtonUI} from '../UI/ButtonUI';
import {ModalInfoWindow} from '../UI/ModalInfoWindow';
import {setTodo} from '../../redux/slices/todosListSlice';
import {useFocusEffect} from '@react-navigation/native';
import {IconBtn} from '../UI/IconBtn';

export const TodoCreatePage = ({navigation}) => {
  const onSelectTagBtn = tagId => {
    dispatch(setSelectedTag(activeTags.filter(todo => todo.id === tagId)[0]));
  };

  const onCancelBtnHandler = useCallback(() => {
    setInputDesc('');
    setInputName('');
    navigation.goBack();
  }, [navigation]);

  const onConfirmBtnHandler = () => {
    if (
      !(Boolean(inputName.trim()) && Boolean(inputDesc.trim()) && selectedTag)
    ) {
      setValidateError('Заполнены не все поля!');
    } else {
      const newTodoObj = {
        userid: activeUser.id,
        title: inputName,
        description: inputDesc,
        tagid: selectedTag.id,
      };
      dispatch(setTodo(newTodoObj));
      setInputDesc('');
      setInputName('');
      dispatch(
        changeTag({
          id: selectedTag.id,
          update: {todoscount: selectedTag.todoscount + 1},
        }),
      );
      navigation.goBack();
    }
  };

  const backAction = useCallback(() => {
    onCancelBtnHandler();
    return true;
  }, [onCancelBtnHandler]);

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, [backAction]),
  );

  const dispatch = useDispatch();
  const {activeUser} = useSelector(store => store.userInfo);
  const {activeTags, selectedTag} = useSelector(store => store.tagsList);
  const [inputName, setInputName] = useState('');
  const [inputDesc, setInputDesc] = useState('');
  const [validateError, setValidateError] = useState(false);
  return (
    <View style={styles.pageContainer}>
      <ModalInfoWindow
        isOpened={Boolean(validateError)}
        setCloseFunc={() => setValidateError(false)}
        message={validateError}
        title={'Ошибка'}
      />
      <IconBtn
        iconComp={<AntDesign name="back" size={32} color="#e28533" />}
        btnPressFunc={() => onCancelBtnHandler()}
      />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <Text style={[styles.titleH1, {textAlign: 'center'}]}>
            Создание задачи
          </Text>
          <View style={{gap: 15}}>
            <View>
              <Text
                style={[
                  styles.titleH2,
                  {
                    textAlign: 'center',
                  },
                ]}>
                Название
              </Text>
              <TextInput
                onChangeText={setInputName}
                placeholder="Введи название!"
                style={styles.inputTextCustom}
                value={inputName}
              />
            </View>
            <View>
              <Text
                style={[
                  styles.titleH2,
                  {
                    textAlign: 'center',
                  },
                ]}>
                Описание
              </Text>
              <TextInput
                editable
                multiline
                numberOfLines={4}
                onChangeText={setInputDesc}
                value={inputDesc}
                style={styles.inputTextCustom}
                placeholder="Введи описание!"
              />
            </View>
            <View>
              <Text
                style={[
                  styles.titleH2,
                  {
                    textAlign: 'center',
                  },
                ]}>
                Выбери тег
              </Text>
              <FlatList
                data={activeTags}
                horizontal
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <TouchableHighlight
                    activeOpacity={0.9}
                    underlayColor={'#874f1e16'}
                    onPress={() => onSelectTagBtn(item.id)}
                    style={[{backgroundColor: 'white'}, styles.tagBtn]}>
                    <View
                      style={{
                        flex: 1,
                      }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                        }}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                          }}>
                          <AntDesign
                            name={item.icon}
                            size={16}
                            color={item.color}
                          />
                          <Text style={styles.commonText}>{item.title}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableHighlight>
                )}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.titleH2}>Твой выбранный тег</Text>
              {selectedTag ? (
                <TouchableHighlight
                  activeOpacity={0.9}
                  underlayColor={'#874f1e16'}
                  style={[{backgroundColor: 'white'}, styles.tagBtn]}>
                  <View
                    style={{
                      flex: 1,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 10,
                        }}>
                        <AntDesign
                          name={selectedTag.icon}
                          size={16}
                          color={selectedTag.color}
                        />
                        <Text style={styles.commonText}>
                          {selectedTag.title}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableHighlight>
              ) : (
                <Text style={[styles.commonText, {textAlign: 'center'}]}>
                  У твоей задачи нет тега...
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={{gap: 10}}>
          <ButtonUI type="Primary" onPressFunc={() => onConfirmBtnHandler()}>
            Создать
          </ButtonUI>
          <ButtonUI type="Secondary" onPressFunc={() => onCancelBtnHandler()}>
            Отмена
          </ButtonUI>
        </View>
      </View>
    </View>
  );
};
