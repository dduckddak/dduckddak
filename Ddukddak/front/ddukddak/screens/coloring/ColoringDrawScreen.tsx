import React from 'react';
import { StyleSheet, View, ImageBackground, Text } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

interface ColoringDrawScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const ColoringDrawScreen: React.FC<ColoringDrawScreenProps> = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.imageBackground}
    >
      <View style={styles.webviewContainer}>
        <WebView
          source={{ uri: 'http://192.168.30.124:3000' }}
          style={styles.webviewStyle}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webviewContainer: {
    height: '80%',
    width: '80%',
  },
  webviewStyle: {
    flex: 1,
  },
});

export default ColoringDrawScreen;
