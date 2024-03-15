import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

function MyCreateBookScreen() {
  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.imageBackground}
    >
      <View>
        <Text>MyCreateBookScreen</Text>
      </View>
    </ImageBackground>
  );
}

export default MyCreateBookScreen;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
