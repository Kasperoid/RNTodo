import React, {useEffect} from 'react';
import {ScrollView, View, Text, TouchableHighlight} from 'react-native';
import {styles} from '../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeTodo,
  delTodo,
  getTodos,
  setSelectedTodo,
} from '../../redux/slices/todosListSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ButtonUI} from '../UI/ButtonUI';
import {
  changeTag,
  clearSelectedTag,
  delTag,
} from '../../redux/slices/tagsListSlice';
import {supabase} from '../../redux/store';
import {LoadingWindow} from '../UI/LoadingWindow';
import {IconBtn} from '../UI/IconBtn';

export const TodosList = ({navigation}) => {
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

  const backBtnHandler = () => {
    navigation.goBack();
    dispatcher(clearSelectedTag());
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

  const {activeTodos, isLoading} = useSelector(state => state.todosList);
  const {selectedTag} = useSelector(state => state.tagsList);
  const dispatcher = useDispatch();
  return (
    <View style={[{flex: 1, gap: 15}, styles.pageContainer]}>
      {isLoading && <LoadingWindow />}
      <IconBtn
        iconComp={<AntDesign name="back" size={32} color="rgb(226, 133, 51)" />}
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
            onPress={() => navigation.navigate('CreateTodo')}
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
