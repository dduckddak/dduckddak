import React, { useState } from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

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
      source={require('../../assets/images/MainBackground.png')}
      style={styles.ImageBackground}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, !recordingStarted && styles.disabledButton]}
          onPress={handlePreviousStep}
          disabled={!recordingStarted || currentScriptIndex === 0}
        >
          <Text style={styles.buttonText}>이전</Text>
        </TouchableOpacity>
        <Text style={styles.text}>{scripts[currentScriptIndex].content}</Text>
        <TouchableOpacity
          style={[styles.button, !recordingStarted && styles.disabledButton]}
          onPress={handleNextStep}
          disabled={
            !recordingStarted || currentScriptIndex === scripts.length - 1
          }
        >
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartRecording}
        >
          <Text style={styles.buttonText}>녹음 시작</Text>
        </TouchableOpacity>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: 'im-hyemin-bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    backgroundColor: 'gray',
  },
});
