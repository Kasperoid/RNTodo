import React from 'react';
import {TouchableHighlight} from 'react-native';
import {styles} from '../../styles/styles';
import {useEffect} from 'react';
import Animated, {
  cancelAnimation,
  runOnJS,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {setAnimatedTimeout} from '../../helpers/animatedTimeout';

export const ButtonUI = ({
  children,
  onPressFunc,
  type,
  style,
  setIsAnimate,
  isAnimate = false,
  afterAnimateFunc,
}) => {
  const opacity = useSharedValue(1);
  const textOpacity = useSharedValue(1);
  const doneOpacity = useSharedValue(0);

  const endAnimation = () => {
    'worklet';
    setAnimatedTimeout(() => {
      runOnJS(setIsAnimate)(false);
      runOnJS(afterAnimateFunc)();
    }, 200);
  };

  const startDoneOpacityAnimation = () => {
    'worklet';
    doneOpacity.value = withTiming(1, {duration: 1200}, isFinish => {
      if (isFinish) {
        doneOpacity.value = withTiming(0, {duration: 1200}, isFinish => {
          if (isFinish) {
            textOpacity.value = withTiming(1, {duration: 1500}, isFinish => {
              if (isFinish) {
                endAnimation();
              }
            });
          }
        });
      }
    });
  };

  const startTextOpacityAnimation = () => {
    'worklet';
    textOpacity.value = withRepeat(
      withSequence(withTiming(0, {duration: 1200})),
      1,
      false,
      isFinish => {
        if (isFinish) {
          startDoneOpacityAnimation();
        }
      },
    );
  };

  const startFlickerAnimation = () => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, {duration: 1200}),
        withTiming(0.6, {duration: 1200}),
        withTiming(1, {duration: 1200}),
      ),
      2,
      false,
      isFinish => {
        if (isFinish) {
          startTextOpacityAnimation();
        }
      },
    );
  };

  useEffect(() => {
    if (isAnimate) {
      startFlickerAnimation();
    } else {
      cancelAnimation(opacity);
      cancelAnimation(textOpacity);
      cancelAnimation(doneOpacity);
      opacity.value = 1;
      textOpacity.value = 1;
      doneOpacity.value = 0;
    }
  }, [isAnimate]);

  return (
    <TouchableHighlight
      onPress={onPressFunc}
      activeOpacity={0.9}
      underlayColor={'#874f1e'}
      style={[styles.buttonTouchableContainer, style]}>
      <Animated.View
        style={[
          styles[`button${type}`],
          styles.buttonInnerContainer,
          {opacity},
        ]}>
        <Animated.Text
          style={[
            {
              color: type === 'Primary' ? 'white' : '#e28533',
              opacity: textOpacity,
            },
            styles.textButton,
          ]}>
          {children}
        </Animated.Text>
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
            },
            {opacity: doneOpacity},
          ]}>
          <AntDesign name={'check'} size={32} color={'white'} />
        </Animated.View>
      </Animated.View>
    </TouchableHighlight>
  );
};
