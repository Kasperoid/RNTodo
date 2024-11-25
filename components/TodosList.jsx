import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, TouchableHighlight} from 'react-native';
import {styles} from '../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  addNewTodo,
  deleteTodo,
  deleteTodoToTag,
  setActiveTodos,
  setSelectedTodo,
  toggleTodoChecked,
} from '../redux/slices/todosListSlice';
import {ModalInput} from './ModalInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import uuid from 'react-native-uuid';
import {ButtonUI} from './UI/ButtonUI';
import {
  addCountTodo,
  deleteTag,
  removeCountTodo,
} from '../redux/slices/tagsListSlice';

export const TodosList = ({navigation}) => {
  const btnAddTodoHandler = () => {
    const newTodoObj = {
      id: uuid.v4(),
      userId: activeUser.id,
      title: newTodoInput,
      completed: false,
      tags: [selectedTag],
    };
    dispatcher(addNewTodo(newTodoObj));
    setNewTodoInput('');
    setIsOpenAddModal(false);
    dispatcher(addCountTodo());
  };

  const selectTodoHandler = todoId => {
    dispatcher(setSelectedTodo(todoId));
    navigation.navigate('TodoDesc');
  };

  const deleteTodoHandler = todoId => {
    dispatcher(deleteTodo(todoId));
    dispatcher(removeCountTodo());
  };

  const deleteTagBtnHandler = () => {
    navigation.navigate('Home');
    dispatcher(deleteTag(selectedTag));
    dispatcher(deleteTodoToTag(selectedTag));
  };

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [newTodoInput, setNewTodoInput] = useState('');

  const {activeTodos, todosList} = useSelector(state => state.todosList);
  const {selectedTag} = useSelector(state => state.tagsList);
  const {activeUser} = useSelector(store => store.userInfo);
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(setActiveTodos(selectedTag));
  }, [dispatcher, selectedTag, todosList]);
  return (
    <View style={[{flex: 1}, styles.pageContainer]}>
      <ModalInput
        isOpened={isOpenAddModal}
        setCloseFunc={() => setIsOpenAddModal(false)}
        inputValue={newTodoInput}
        setChangeTextFunc={text => setNewTodoInput(text)}
        btnFuncHandler={() => btnAddTodoHandler()}
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
                  onPress={() => dispatcher(toggleTodoChecked(item.id))}>
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
