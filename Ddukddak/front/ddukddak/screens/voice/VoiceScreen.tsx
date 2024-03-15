import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

function VoiceScreen() {
  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.imageBackground}
    >
      <View>
        <Text>VoiceScreen</Text>
      </View>
    </ImageBackground>
  );
}

export default VoiceScreen;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
