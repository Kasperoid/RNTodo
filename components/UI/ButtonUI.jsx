import React from 'react';
import {TouchableHighlight, View, Text} from 'react-native';
import {styles} from '../../styles/styles';

export const ButtonUI = ({children, onPressFunc, type, style}) => {
  return (
    <TouchableHighlight
      onPress={onPressFunc}
      activeOpacity={0.9}
      underlayColor={'#874f1e'}
      style={[styles.buttonTouchableContainer, style]}>
      <View style={[styles[`button${type}`], styles.buttonInnerContainer]}>
        <Text
          style={[
            {
              color: type === 'Primary' ? 'white' : '#e28533',
            },
            styles.textButton,
          ]}>
          {children}
        </Text>
      </View>
    </TouchableHighlight>
  );
};
