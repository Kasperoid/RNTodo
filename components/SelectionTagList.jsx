import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import React from 'react';
import {TouchableHighlight} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {styles} from '../styles/styles';

export const SelectionTagList = ({data, setFunc, type, selectType}) => {
  return (
    <BottomSheetFlatList
      data={data}
      numColumns={Math.ceil(data.length / 2)}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <TouchableHighlight
          activeOpacity={0.9}
          underlayColor={'#874f1e16'}
          onPress={() => setFunc(type === 'color' ? item.color : item.title)}
          style={styles.selectTagOptionContainer}>
          {type === 'color' ? (
            <AntDesign name={selectType} size={16} color={item.color} />
          ) : (
            <AntDesign name={item.title} size={16} color={selectType} />
          )}
        </TouchableHighlight>
      )}
    />
  );
};
