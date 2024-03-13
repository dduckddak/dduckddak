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
      <View style={styles.flexContainer}>
        <Text>안녕</Text>

        <WebView
          source={{ uri: 'http://192.168.30.124:3000' }}
          style={styles.webviewStyle}
        />
        <Text>아</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  webviewStyle: {
    width: "90%",
    height: "70%",
    borderWidth: 500
  },
});

export default ColoringDrawScreen;
