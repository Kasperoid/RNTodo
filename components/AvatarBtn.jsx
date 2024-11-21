import React from 'react';
import {Image, TouchableHighlight, View} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {styles} from '../styles/styles';

export const AvatarBtn = ({userAvatar, btnPressFunc}) => {
  return (
    <View style={{alignItems: 'flex-start'}}>
      <TouchableHighlight
        underlayColor={'#874f1e16'}
        onPress={btnPressFunc}
        style={styles.avatarBtnContainer}>
        {userAvatar ? (
          <Image source={userAvatar} />
        ) : (
          <FontAwesome6 name="circle-user" size={32} color="#e28533" />
        )}
      </TouchableHighlight>
    </View>
  );
};
