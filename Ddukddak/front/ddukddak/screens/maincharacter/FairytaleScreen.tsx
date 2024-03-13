import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

function FairytaleScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState({
    redHood: { photo: null, voice: null },
    wolf: { photo: null, voice: null },
    narration: { voice: null },
    bookName: '',
  });

  const pickImage = async () => {
    // 이미지 선택 로직
  };

  const recordVoice = async () => {
    // 오디오 녹음 로직
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // 여기서 데이터를 서버에 POST 요청
      console.log('Send data to server:', data);
    }
  };
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <View>
            <Button title="빨간 모자 사진 선택" onPress={pickImage} />
            <Button title="빨간 모자 목소리 녹음" onPress={recordVoice} />
          </View>
        );
      case 2:
        return (
          <View>
            <Button title="늑대 사진 선택" onPress={pickImage} />
            <Button title="늑대 목소리 녹음" onPress={recordVoice} />
          </View>
        );
      case 3:
        return (
          <View>
            <Button title="내레이션 목소리 녹음" onPress={recordVoice} />
          </View>
        );
      case 4:
        return (
          <View>
            <TextInput
              placeholder="책 이름 입력"
              onChangeText={(text) => setData({ ...data, bookName: text })}
            />
          </View>
        );
      default:
        return <View />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../../assets/images/fairybackground.png')}
        style={styles.imageBackground}
      >
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          {renderStep()}
          <Button title="다 찾았어요" onPress={handleNextStep} />
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
    width: '75%',
    height: '100%',
  },
});
