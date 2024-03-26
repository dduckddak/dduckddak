import React, { useState } from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Audio } from 'expo-av';
import GreenButton from '../../components/GreenButton';
import EndRecordModal from '../../components/voice/EndRecordModal';

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
  const [recording, setRecording] = useState<Audio.Recording | undefined>(
    undefined,
  );
  const [voiceUri, setVoiceUri] = useState<string | null>('');
  const [recordingStartTime, setRecordingStartTime] = useState(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  async function startRecording() {
    const { status } = await Audio.requestPermissionsAsync();
    try {
      if (status !== 'granted') {
        console.error('권한 거절');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('녹음 시작하는 중..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      setRecording(recording);
      console.log('녹음 시작');

      setRecordingStartTime(Date.now());
    } catch (err) {
      console.error('녹음 실패', err);
    }
    const timer = setTimeout(() => {
      stopRecording();
    }, 10000);
    setTimerId(timer);
  }

  async function stopRecording() {
    if (recording) {
      if (timerId) clearTimeout(timerId);
      const elapsedTime = Date.now() - recordingStartTime;
      if (elapsedTime < 3000) {
        Alert.alert(
          '녹음이 너무 짧습니다',
          '녹음은 최소 3초 이상이어야 합니다.',
        );
        return;
      }

      console.log('녹음 종료');
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('요기다', uri);
      setVoiceUri(uri);
      setRecording(undefined);
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      setModalVisible(true);
    } else {
      console.log('No active recording to stop.');
    }
  }

  const handleModalClose = () => {
    setModalVisible(false); // 모달 닫기
  };

  const recordingStarted = recording !== undefined;

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
          content={recording ? '녹음 종료' : '녹음 시작'}
          onPress={recording ? stopRecording : startRecording}
          style={{ width: '15%', margin: 20 }}
        />
        <EndRecordModal
          visible={modalVisible}
          onClose={handleModalClose}
          recordingUri={voiceUri} // 녹음된 URI를 넘깁니다
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
