import React from 'react';
import { ImageBackground, Text, View, StyleSheet } from 'react-native';
import GreenButton from '../../components/GreenButton';
import { useNavigation } from '@react-navigation/native';

function AddVoiceScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../assets/images/background/MainBackground.png')}
      style={styles.ImageBackground}
    >
      <View style={styles.container}>
        <Text style={styles.text}>목소리를 추가하고 싶구나 !</Text>
        <Text style={styles.text}>
          목소리를 추가하기 위해 대사를 읽어줄 수 있겠니?
        </Text>
      </View>
      <GreenButton
        content="녹음하러가기"
        onPress={() => navigation.navigate('record' as never)}
      />
    </ImageBackground>
  );
}

export default AddVoiceScreen;

const styles = StyleSheet.create({
  ImageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center', // 중앙 정렬을 위해 추가
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    fontFamily: 'im-hyemin-bold',
    color: 'white',
  },
});
