import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from 'react-native';

function FairytaleScreen() {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../../assets/images/fairybackground.png')}
        style={styles.imageBackground}
      >
        <View>
          <Text>FairytaleScreen</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

export default FairytaleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center',
  },
});
