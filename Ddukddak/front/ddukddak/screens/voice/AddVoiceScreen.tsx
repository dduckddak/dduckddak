import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, View, StyleSheet, Image } from 'react-native';
import GreenButton from '../../components/GreenButton';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../../store/userStore';

function AddVoiceScreen() {
  const userSex = useUserStore((state) => state.sex);
  const [character, setCharacter] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    const updateMainImage = () => {
      if (userSex === 'M') {
        setCharacter(require('../../assets/images/Main/뚝이zip.gif'));
      } else {
        setCharacter(require('../../assets/images/Main/딱이zip3.gif'));
      }
    };

    updateMainImage();
  }, []);
  return (
    <ImageBackground
      source={require('../../assets/images/background/morning.jpg')}
      style={styles.ImageBackground}
    >
      <View style={styles.container}>
        <Image source={character} style={styles.dd}></Image>
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
    left: 20,
    width: 500,
    height: 500,
    bottom: -320,
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
