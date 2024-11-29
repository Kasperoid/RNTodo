import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FlatList, Text, TouchableHighlight, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from '../../styles/styles';
import {delTag} from '../../redux/slices/tagsListSlice';

export const TagsHomeList = ({onTagBtnHandler}) => {
  const deleteTagBtnHandler = idTag => {
    dispatcher(delTag(idTag));
  };

  const dispatcher = useDispatch();
  const {activeTags} = useSelector(store => store.tagsList);
  return (
    <View
      style={{
        alignItems: activeTags && activeTags.length !== 0 ? 'none' : 'center',
      }}>
      {activeTags && activeTags.length !== 0 ? (
        <FlatList
          data={activeTags}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableHighlight
              activeOpacity={0.9}
              underlayColor={'#874f1e16'}
              onPress={() => onTagBtnHandler(item.id)}
              style={[{backgroundColor: 'white'}, styles.tagBtn]}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingBottom: 10,
                    marginBottom: 10,
                    borderBottomWidth: 1,
                    borderColor: '#e28533',
                    gap: 10,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <AntDesign name={item.icon} size={16} color={item.color} />
                    <Text style={[styles.commonText, {flex: 1}]}>
                      {item.title}
                    </Text>
                  </View>
                  <TouchableHighlight
                    underlayColor={'inherit'}
                    onPress={() => deleteTagBtnHandler(item.id)}>
                    <AntDesign name="closecircle" size={17} color="#e28533" />
                  </TouchableHighlight>
                </View>
                <Text style={[styles.commonText, {textAlign: 'center'}]}>
                  Всего задач: {item.todoscount}
                </Text>
              </View>
            </TouchableHighlight>
          )}
        />
      ) : (
        <Text style={{color: 'black', fontWeight: 600}}>
          У тебя пока нет категорий...
        </Text>
      )}
    </View>
  );
};
