import React from 'react';
import { ImageBackground, Text, View, StyleSheet, Image } from 'react-native';
import GreenButton from '../../components/GreenButton';
import { useNavigation } from '@react-navigation/native';

function AddVoiceScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../assets/images/background/fairybackground.png')}
      style={styles.ImageBackground}
    >
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/Main/딱이zip.gif')}
          style={styles.dd}
        ></Image>
        <Image
          source={require('../../assets/images/Main/ballon.png')}
          style={styles.ballon}
        ></Image>
        <View style={styles.ballontext}>
          <Text style={styles.text}>목소리를 추가하고 싶구나 !</Text>
          <Text style={styles.text}>
            목소리를 추가하기 위해서{'\n'}
            대사 조금만{'\n'}
            읽어줄 수 있을까?
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <GreenButton
          content="녹음하러가기"
          onPress={() => navigation.navigate('record' as never)}
          style={styles.buttonStyle}
        />
      </View>
    </ImageBackground>
  );
}

export default AddVoiceScreen;

const styles = StyleSheet.create({
  ImageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dd: {
    position: 'absolute',
    left: 30,
    width: 500,
    height: 500,
    bottom: -300,
  },
  ballon: {
    position: 'absolute',
    top: 40,
    right: 60,
  },
  ballontext: {
    position: 'absolute',
    right: 130,
    top: 210,
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    fontFamily: 'im-hyemin-bold',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 50,
  },
  buttonStyle: {
    width: '20%',
    bottom: -10,
  },
});
