import React from 'react';
import {ScrollView, View, Text, TouchableHighlight, Image} from 'react-native';
import {styles} from '../styles/styles';
import {ModalInfoWindow} from './ModalInfoWindow';
import {useDispatch, useSelector} from 'react-redux';
import {
  setHelloMsg,
  setIsOpenAddModal,
  setNewTodoInput,
} from '../redux/slices/homePageSlice';
import {addNewTodo, toggleTodoChecked} from '../redux/slices/todosListSlice';
import {ModalAddTodo} from './ModalAddTodo';

export const HomePage = () => {
  const btnAddTodoHandler = () => {
    const newTodoObj = {
      id: Date.now(),
      title: newTodoInput,
      completed: false,
    };
    dispatcher(addNewTodo(newTodoObj));
    dispatcher(setNewTodoInput(''));
    dispatcher(setIsOpenAddModal(false));
  };

  const dispatcher = useDispatch();
  const {helloMsg, isOpenAddModal, newTodoInput} = useSelector(
    state => state.homePage,
  );
  const {todosList} = useSelector(state => state.todosList);
  return (
    <View style={[{flex: 1}, styles.pageContainer]}>
      <ModalInfoWindow
        isOpened={helloMsg}
        setCloseFunc={() => dispatcher(setHelloMsg(false))}
        message={'Добро пожаловать в список задач :)'}
        title={'Успех!'}
      />
      <ModalAddTodo
        isOpened={isOpenAddModal}
        setCloseFunc={() => dispatcher(setIsOpenAddModal(false))}
        inputValue={newTodoInput}
        setChangeTextFunc={text => dispatcher(setNewTodoInput(text))}
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
            onPress={() => dispatcher(setIsOpenAddModal(true))}
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
