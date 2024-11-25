import React, {useState} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {styles} from '../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-gesture-handler';
import {ButtonUI} from './UI/ButtonUI';
import {deleteTodo, setDescTodo} from '../redux/slices/todosListSlice';
import {removeCountTodo} from '../redux/slices/tagsListSlice';

export const TodoDescPage = ({navigation}) => {
  const confirmBtnHandler = () => {
    dispatch(setDescTodo(inputDescValue));
    setIsOpenInput(false);
  };

  const cancelBtnHandler = () => {
    setIsOpenInput(prevState => !prevState);
    setInputDescValue(selectedTodo?.desc || '');
  };

  const deleteTagBtnHandler = () => {
    dispatch(deleteTodo(selectedTodo.id));
    dispatch(removeCountTodo());
    navigation.navigate('TodosList');
  };

  const dispatch = useDispatch();

  const {selectedTodo} = useSelector(state => state.todosList);

  const [activeBtn, setActiveBtn] = useState(false);
  const [inputDescValue, setInputDescValue] = useState(
    selectedTodo?.desc || '',
  );
  const [isOpenInput, setIsOpenInput] = useState(false);
  return (
    <View style={styles.pageContainer}>
      <View style={{flex: 1}}>
        <Text style={[styles.titleH1, {textAlign: 'center', marginBottom: 0}]}>
          {selectedTodo.title}
        </Text>
        <View style={styles.separator} />
        {isOpenInput ? (
          <View>
            <TextInput
              editable
              multiline
              numberOfLines={4}
              onChangeText={text => setInputDescValue(text)}
              value={inputDescValue}
              style={styles.inputTextCustom}
              placeholder="Введи описание!"
            />
            <View style={{gap: 5, marginTop: 15}}>
              <ButtonUI
                type={'Primary'}
                onPressFunc={() => confirmBtnHandler()}>
                Ввести
              </ButtonUI>
              <ButtonUI
                type={'Secondary'}
                onPressFunc={() => cancelBtnHandler()}>
                Отменить
              </ButtonUI>
            </View>
          </View>
        ) : selectedTodo?.desc ? (
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Text style={styles.commonText}>{selectedTodo.desc}</Text>
            <TouchableHighlight
              underlayColor={null}
              onPress={() => setIsOpenInput(prevState => !prevState)}
              onPressIn={() => setActiveBtn(true)}
              onPressOut={() => setActiveBtn(false)}>
              <AntDesign
                name="edit"
                size={18}
                color={activeBtn ? '#e28533' : 'black'}
              />
            </TouchableHighlight>
          </View>
        ) : (
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Text style={styles.commonText}>{'Описания нет...'}</Text>
            <TouchableHighlight
              onPress={() => setIsOpenInput(prevState => !prevState)}
              underlayColor={null}
              onPressIn={() => setActiveBtn(true)}
              onPressOut={() => setActiveBtn(false)}>
              <Text style={{color: '#e28533', fontWeight: 700}}>Добавить?</Text>
            </TouchableHighlight>
          </View>
        )}
      </View>
      <ButtonUI type={'Primary'} onPressFunc={() => deleteTagBtnHandler()}>
        Удалить задачу
      </ButtonUI>
    </View>
  );
};
