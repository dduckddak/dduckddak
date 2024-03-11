import React, { useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  // Animated,
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

function MainRending() {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });

  useEffect(() => {
    console.log('useEffect executed');
    rotation.value = withRepeat(withTiming(10), 6, true);
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/images/Rending.png')}
      style={styles.imageBackground}
    >
      <View>
        <Text style={{ fontSize: 40 }}>메인랜딩페이지</Text>
        <View>
          <Animated.Image
            source={require('../../assets/images/뚝이.png')}
            style={[styles.dduck, animatedStyle]}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    padding: 30,
  },
  dduck: {
    marginTop: 120,
    marginLeft: 80,
  },
});

export default MainRending;
