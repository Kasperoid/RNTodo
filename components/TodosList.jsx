import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, TouchableHighlight, Image} from 'react-native';
import {styles} from '../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  addNewTodo,
  setActiveTodos,
  toggleTodoChecked,
} from '../redux/slices/todosListSlice';
import {ModalInput} from './ModalInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import uuid from 'react-native-uuid';

export const TodosList = () => {
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
            <View key={item.id} style={styles.todoItemsContainer}>
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
                  width: '90%',
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
            </View>
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
    </View>
  );
};
