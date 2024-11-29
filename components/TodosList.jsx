import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, View, Text, TouchableHighlight} from 'react-native';
import {styles} from '../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeTodo,
  delTodo,
  getTodos,
  setSelectedTodo,
  setTodo,
} from '../redux/slices/todosListSlice';
import {ModalInput} from './ModalInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ButtonUI} from './UI/ButtonUI';
import {changeTag, delTag} from '../redux/slices/tagsListSlice';
import {useFocusEffect} from '@react-navigation/native';
import {supabase} from '../redux/store';
import {LoadingWindow} from './UI/LoadingWindow';
import {IconBtn} from './UI/IconBtn';

export const TodosList = ({navigation}) => {
  const btnAddTodoHandler = () => {
    const newTodoObj = {
      userid: activeUser.id,
      title: newTodoInput,
      tagid: selectedTag.id,
    };
    dispatcher(setTodo(newTodoObj));
    setNewTodoInput('');
    setIsOpenAddModal(false);
    dispatcher(
      changeTag({
        id: selectedTag.id,
        update: {todoscount: selectedTag.todoscount + 1},
      }),
    );
  };

  const selectTodoHandler = todoId => {
    dispatcher(setSelectedTodo(todoId));
    navigation.navigate('TodoDesc');
  };

  const deleteTodoHandler = todoId => {
    dispatcher(delTodo(todoId));
    dispatcher(
      changeTag({
        id: selectedTag.id,
        update: {todoscount: selectedTag.todoscount - 1},
      }),
    );
  };

  const deleteTagBtnHandler = () => {
    navigation.navigate('Home');
    dispatcher(delTag(selectedTag.id));
  };

  const btnChangeHandler = (todoId, todoCompleted) => {
    dispatcher(changeTodo({id: todoId, update: {completed: !todoCompleted}}));
  };

  useEffect(() => {
    const todos = supabase
      .channel('public:todos')
      .on(
        'postgres_changes',
        {event: '*', schema: 'public', table: 'todos'},
        () => {
          dispatcher(getTodos(selectedTag.id));
        },
      )
      .subscribe();
    return () => {
      todos.unsubscribe();
    };
  }, [selectedTag, dispatcher]);

  useEffect(() => {
    dispatcher(getTodos(selectedTag.id));
  }, [dispatcher, selectedTag]);

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [newTodoInput, setNewTodoInput] = useState('');

  const {activeTodos, isLoading} = useSelector(state => state.todosList);
  const {selectedTag} = useSelector(state => state.tagsList);
  const {activeUser} = useSelector(store => store.userInfo);
  const dispatcher = useDispatch();
  return (
    <View style={[{flex: 1, gap: 15}, styles.pageContainer]}>
      {isLoading && <LoadingWindow />}
      <ModalInput
        isOpened={isOpenAddModal}
        setCloseFunc={() => setIsOpenAddModal(false)}
        inputValue={newTodoInput}
        setChangeTextFunc={text => setNewTodoInput(text)}
        btnFuncHandler={() => btnAddTodoHandler()}
      />
      <IconBtn
        iconComp={<AntDesign name="back" size={32} color="#e28533" />}
        btnPressFunc={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={{flex: 1, gap: 10}}>
        {activeTodos && activeTodos.length !== 0 ? (
          activeTodos.map(item => (
            <TouchableHighlight
              activeOpacity={0.9}
              underlayColor={'#874f1e16'}
              key={item.id}
              onPress={() => selectTodoHandler(item.id)}>
              <View style={styles.todoItemsContainer}>
                <TouchableHighlight
                  style={styles.buttonCheckedContainer}
                  underlayColor={'inherit'}
                  onPress={() => btnChangeHandler(item.id, item.completed)}>
                  <View style={{width: 15, height: 15}}>
                    {item.completed && (
                      <AntDesign name="check" size={16} color="#e28533" />
                    )}
                  </View>
                </TouchableHighlight>
                <View
                  style={{
                    width: '75%',
                  }}>
                  <Text
                    style={{
                      color: item.completed ? 'grey' : 'black',
                      fontWeight: 600,
                      fontSize: 16,
                      textDecorationLine: item.completed
                        ? 'line-through'
                        : 'none',
                    }}>
                    {item.title}
                  </Text>
                </View>
                <TouchableHighlight
                  underlayColor={'inherit'}
                  onPress={() => deleteTodoHandler(item.id)}>
                  <AntDesign name="closecircle" size={20} color="#e28533" />
                </TouchableHighlight>
              </View>
            </TouchableHighlight>
          ))
        ) : (
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 600,
                fontSize: 16,
                color: 'black',
              }}>
              По категории нет задач...
            </Text>
          </View>
        )}
        <View style={{alignItems: 'center'}}>
          <TouchableHighlight
            onPress={() => setIsOpenAddModal(true)}
            activeOpacity={0.9}
            underlayColor={'#874f1e16'}
            style={[styles.buttonTouchableContainer]}>
            <AntDesign name="pluscircleo" size={25} color={'#e28533'} />
          </TouchableHighlight>
        </View>
      </ScrollView>
      <ButtonUI type="Primary" onPressFunc={() => deleteTagBtnHandler()}>
        Удалить категорию
      </ButtonUI>
    </View>
  );
};
