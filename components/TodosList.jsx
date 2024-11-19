import React, {useState} from 'react';
import {ScrollView, View, Text, TouchableHighlight, Image} from 'react-native';
import {styles} from '../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {addNewTodo, toggleTodoChecked} from '../redux/slices/todosListSlice';
import {ModalAddTodo} from './ModalAddTodo';

export const TodosList = () => {
  const btnAddTodoHandler = () => {
    const newTodoObj = {
      id: Date.now(),
      title: newTodoInput,
      completed: false,
    };
    dispatcher(addNewTodo(newTodoObj));
    setNewTodoInput('');
    setIsOpenAddModal(false);
  };

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [newTodoInput, setNewTodoInput] = useState('');

  const {todosList} = useSelector(state => state.todosList);
  const dispatcher = useDispatch();
  return (
    <View style={[{flex: 1}, styles.pageContainer]}>
      <ModalAddTodo
        isOpened={isOpenAddModal}
        setCloseFunc={() => setIsOpenAddModal(false)}
        inputValue={newTodoInput}
        setChangeTextFunc={text => setNewTodoInput(text)}
        btnFuncHandler={() => btnAddTodoHandler()}
      />
      <ScrollView contentContainerStyle={{flex: 1, gap: 10}}>
        {todosList.map(item => (
          <View key={item.id} style={styles.todoItemsContainer}>
            <TouchableHighlight
              style={styles.buttonCheckedContainer}
              underlayColor={'inherit'}
              onPress={() => dispatcher(toggleTodoChecked(item.id))}>
              <View style={{width: 15, height: 15}}>
                {item.completed && (
                  <Image
                    style={{width: 15, height: 15}}
                    source={require('./../img/done.png')}
                  />
                )}
              </View>
            </TouchableHighlight>
            <View
              style={{
                width: '90%',
              }}>
              <Text>{item.title}</Text>
            </View>
          </View>
        ))}
        <View style={{alignItems: 'center'}}>
          <TouchableHighlight
            onPress={() => setIsOpenAddModal(true)}
            activeOpacity={0.9}
            underlayColor={'#874f1e'}
            style={[styles.buttonTouchableContainer]}>
            <View style={styles.buttonAddContainer}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 600,
                }}>
                +
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  );
};
