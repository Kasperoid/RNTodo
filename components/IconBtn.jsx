import React from 'react';
import {TouchableHighlight, View} from 'react-native';
import {styles} from '../styles/styles';

export const IconBtn = ({iconComp, btnPressFunc}) => {
  return (
    <View style={{alignItems: 'flex-start'}}>
      <TouchableHighlight
        underlayColor={'#874f1e16'}
        onPress={btnPressFunc}
        style={styles.avatarBtnContainer}>
        {iconComp}
        {/* {userAvatar ? (
          <Image source={userAvatar} />
        ) : (
          <FontAwesome6 name="circle-user" size={32} color="#e28533" />
        )} */}
      </TouchableHighlight>
    </View>
  );
};
