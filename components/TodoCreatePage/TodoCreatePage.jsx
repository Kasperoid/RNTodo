import React, {useCallback, useState} from 'react';
import {
  BackHandler,
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {styles} from '../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {changeTag, setSelectedTag} from '../../redux/slices/tagsListSlice';
import {ButtonUI} from '../UI/ButtonUI';
import {ModalInfoWindow} from '../UI/ModalInfoWindow';
import {
  setNewTodoImgSettings,
  setTodo,
} from '../../redux/slices/todosListSlice';
import {useFocusEffect} from '@react-navigation/native';
import {IconBtn} from '../UI/IconBtn';
import ImagePicker from 'react-native-image-crop-picker';

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
    if (!(Boolean(inputName.trim()) && selectedTag)) {
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

  const changeImageTodo = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 250,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      const fileData = image.data;
      const fileExt = image.path.split('.').at(-1);
      const mime = image.mime;
      dispatch(
        setNewTodoImgSettings({
          ext: fileExt,
          data: fileData,
          mime: mime,
          path: image.path,
        }),
      );
    });
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, [backAction]),
  );

  const dispatch = useDispatch();
  const {newTodoImgSettings} = useSelector(state => state.todosList);
  const {activeUser} = useSelector(store => store.userInfo);
  const {activeTags, selectedTag} = useSelector(store => store.tagsList);
  const [inputName, setInputName] = useState('');
  const [inputDesc, setInputDesc] = useState('');
  const [validateError, setValidateError] = useState(false);

  return (
    <View style={styles.pageContainer}>
      <ScrollView>
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
              <View>
                <Text style={[styles.titleH2, {textAlign: 'center'}]}>
                  Можешь вставить картинку
                </Text>
                {newTodoImgSettings ? (
                  <View style={{gap: 15}}>
                    <View style={{alignItems: 'center'}}>
                      <Image
                        style={{height: 250, width: 300}}
                        source={{uri: newTodoImgSettings.path}}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 10,
                      }}>
                      <ButtonUI
                        style={{flex: 1}}
                        type={'Primary'}
                        onPressFunc={() => changeImageTodo()}>
                        Изменить
                      </ButtonUI>
                      <ButtonUI
                        style={{flex: 1}}
                        type={'Secondary'}
                        onPressFunc={() =>
                          dispatch(setNewTodoImgSettings(null))
                        }>
                        Отменить
                      </ButtonUI>
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={[styles.commonText]}>
                      У этой задачи нет картинки...
                    </Text>
                    <ButtonUI
                      type="Primary"
                      onPressFunc={() => changeImageTodo()}>
                      Добавить?
                    </ButtonUI>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View
            style={{
              gap: 10,
              marginTop: 15,
              paddingTop: 15,
              borderTopWidth: 1,
              borderColor: '#e28533',
            }}>
            <ButtonUI type="Primary" onPressFunc={() => onConfirmBtnHandler()}>
              Создать
            </ButtonUI>
            <ButtonUI type="Secondary" onPressFunc={() => onCancelBtnHandler()}>
              Отмена
            </ButtonUI>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
