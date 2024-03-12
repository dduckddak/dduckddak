import React, { useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  // Animated,
} from 'react-native';

function MainRending() {
  return (
    <ImageBackground
      source={require('../../assets/images/Rending.png')}
      style={styles.imageBackground}
    >
      <View>
        <Text style={{ fontSize: 40 }}>메인랜딩페이지</Text>
        <View>
          <Image
            source={require('../../assets/images/뚝이.png')}
            style={styles.dduck}
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
