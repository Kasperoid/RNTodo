import React from 'react';
import {Image, TouchableHighlight, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../styles/styles';

export const AvatarBtn = ({userAvatar}) => {
  return (
    <View style={{alignItems: 'flex-start'}}>
      <TouchableHighlight
        underlayColor={'#874f1e16'}
        onPress={() => console.log('!!!')}
        style={styles.avatarBtnContainer}>
        {userAvatar ? (
          <Image source={userAvatar} />
        ) : (
          <MaterialIcons name="account" size={32} color="#e28533" />
        )}
      </TouchableHighlight>
    </View>
  );
};
