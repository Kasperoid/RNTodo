import React from 'react';
import LottieView from 'lottie-react-native';
import {View} from 'react-native';
import {styles} from '../../styles/styles';

export const LoadingWindow = () => {
  return (
    <View style={styles.loadingBackdrop}>
      <View style={{alignItems: 'center'}}>
        <LottieView
          source={require('../../animation/loading/loadingAnim.json')}
          autoPlay
          loop
          style={{width: 220, height: 220}}
        />
      </View>
    </View>
  );
};
