import React, { useState } from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import GreenButton from '../../components/GreenButton';

function RecordScreen() {
  const scripts = [
    { id: 1, content: '옛날 옛날 욕심쟁이 형과' },
    { id: 2, content: '마음 착한 아우가 살았어' },
    {
      id: 3,
      content: '어느날 아우가 산에서 나무를 하는데 개암이 세개가 뚝 떨어졌어요',
    },
    { id: 4, content: '“어? 개암이네 이건 부모님과 형님께 드려야겠다”' },
    {
      id: 5,
      content:
        '집에 가려는데 날이 저물어 저녁이 되었어요 “어? 벌써 이렇게 되었나? 서둘러 가야겠다”',
    },
  ];

  const [currentScriptIndex, setCurrentScriptIndex] = useState(0);
  const [recordingStarted, setRecordingStarted] = useState(false);

  const handleNextStep = () => {
    if (currentScriptIndex < scripts.length - 1) {
      setCurrentScriptIndex(currentScriptIndex + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentScriptIndex > 0) {
      setCurrentScriptIndex(currentScriptIndex - 1);
    }
  };

  const handleStartRecording = () => {
    setRecordingStarted(true);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background/MainBackground.png')}
      style={styles.ImageBackground}
    >
      <View style={styles.outerContainer}>
        <View style={styles.buttonTextContainer}>
          <TouchableOpacity
            style={[styles.button, !recordingStarted && styles.disabledButton]}
            onPress={handlePreviousStep}
            disabled={!recordingStarted || currentScriptIndex === 0}
          >
            <Image source={require('../../assets/images/button/before.png')} />
          </TouchableOpacity>
          <View style={styles.scriptTextContainer}>
            <Text style={styles.text}>
              {scripts[currentScriptIndex].content}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.button, !recordingStarted && styles.disabledButton]}
            onPress={handleNextStep}
            disabled={
              !recordingStarted || currentScriptIndex === scripts.length - 1
            }
          >
            <Image source={require('../../assets/images/button/next.png')} />
          </TouchableOpacity>
        </View>
        <Text style={styles.counterText}>
          {scripts[currentScriptIndex].id} / {scripts.length}
        </Text>

        <GreenButton
          content="녹음 시작"
          onPress={handleStartRecording}
          style={{ width: '15%', margin: 20 }}
        />
      </View>
    </ImageBackground>
  );
}

export default RecordScreen;

const styles = StyleSheet.create({
  ImageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  scriptTextContainer: {
    width: '70%',
    height: '70%',
    backgroundColor: '#5FB0CC',
    borderRadius: 10,
    justifyContent: 'center',
  },
  counterText: {
    fontSize: 20,
    fontFamily: 'im-hyemin-bold',
    margin: 10,
  },
  text: {
    fontSize: 36,
    fontFamily: 'im-hyemin-bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 20,
    borderRadius: 5,
    marginVertical: 5,
  },
  startButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  disabledButton: {
    opacity: 0.5,
  },
});
