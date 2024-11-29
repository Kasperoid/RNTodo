import React, {useEffect, useState} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {styles} from '../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-gesture-handler';
import {ButtonUI} from '../UI/ButtonUI';
import {changeTodo, delTodo, getTodo} from '../../redux/slices/todosListSlice';
import {changeTag} from '../../redux/slices/tagsListSlice';
import {LoadingWindow} from '../UI/LoadingWindow';
import {supabase} from '../../redux/store';
import {IconBtn} from '../UI/IconBtn';

export const TodoDescPage = ({navigation}) => {
  const confirmBtnHandler = () => {
    dispatch(
      changeTodo({
        id: selectedTodo.id,
        update: {description: inputDescValue},
      }),
    );
    setIsOpenInput(false);
  };

  const cancelBtnHandler = () => {
    setIsOpenInput(prevState => !prevState);
    setInputDescValue(selectedTodo.description || '');
  };

  const deleteTagBtnHandler = () => {
    dispatch(delTodo(selectedTodo.id));
    dispatch(
      changeTag({
        id: selectedTag.id,
        update: {todoscount: selectedTag.todoscount},
      }),
    );
    navigation.navigate('TodosList');
  };

  useEffect(() => {
    const todos = supabase
      .channel('public:todos')
      .on(
        'postgres_changes',
        {event: '*', schema: 'public', table: 'todos'},
        () => {
          dispatch(getTodo(selectedTodo.id));
        },
      )
      .subscribe();
    return () => {
      todos.unsubscribe();
    };
  }, [dispatch, selectedTodo]);

  const dispatch = useDispatch();

  const {selectedTodo, isLoading} = useSelector(state => state.todosList);
  const {selectedTag} = useSelector(state => state.tagsList);

  const [activeBtn, setActiveBtn] = useState(false);
  const [inputDescValue, setInputDescValue] = useState(
    selectedTodo.description || '',
  );
  const [isOpenInput, setIsOpenInput] = useState(false);
  return (
    <View style={[styles.pageContainer, {gap: 15}]}>
      {isLoading && <LoadingWindow />}
      <IconBtn
        iconComp={<AntDesign name="back" size={32} color="#e28533" />}
        btnPressFunc={() => navigation.goBack()}
      />
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
        ) : selectedTodo.description ? (
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Text style={styles.commonText}>{selectedTodo.description}</Text>
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
