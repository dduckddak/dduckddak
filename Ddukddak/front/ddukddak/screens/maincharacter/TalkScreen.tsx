import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from 'react-native';

function TalkScreen() {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../../assets/images/background/background.png')}
        style={styles.imageBackground}
      >
        <View>
          <Text>TalkScreen</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

export default TalkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
});
