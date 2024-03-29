import React, { useState } from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Audio } from 'expo-av';
import GreenButton from '../../components/GreenButton';
import EndRecordModal from '../../components/voice/EndRecordModal';
import AlertModal from '../../components/AlertModal';

const scripts = [
  {
    id: 1,
    content:
      '오랜 옛날, 숲속 마을에 동물과 \n 대화할 수 있는 마녀가 있었어요.\n 이 마녀에게는 사람들의 꿈을 이루어 주는 \n 특별한 능력이 있었죠. ',
  },
  {
    id: 2,
    content:
      '어느 날, 하늘을 나는 꿈을 가진 소녀가 \n 마녀에게 도움을 청하기 위해 찾아왔어요.\n 소녀의 이야기를 들은 마녀는 \n 소녀를 숲 속 깊은 곳으로 데려가서 \n 반짝이는 별가루를 건네주었어요.',
  },
  {
    id: 3,
    content:
      '별가루를 받은 소녀는 마법처럼 \n 천천히 하늘로 솟구쳐 올랐고,\n 그 순간을 기뻐하며 웃음을 터트렸어요.  ',
  },
  {
    id: 4,
    content:
      '마녀는 소녀가 하늘을 나는 모습을 바라보며 행복해했고,\n 소녀는 자신의 꿈을 \n실현한 것에 대해 깊은 감사를 느꼈어요.',
  },
  {
    id: 5,
    content:
      '이 사건 이후로 소녀는 \n 모든 사람이 꿈을 이룰 수 있다고 굳게 믿게 되었습니다.\n 마녀는 오늘도 숲속에서 \n 다른 사람들의 꿈을 실현시키기 위해 \n마법을 준비하고 있습니다.',
  },
];

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

function RecordScreen() {
  const [currentScriptIndex, setCurrentScriptIndex] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording | undefined>(
    undefined,
  );
  const [voiceUri, setVoiceUri] = useState<string | null>('');
  const [recordingStartTime, setRecordingStartTime] = useState(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // 시간이 짧을 때 모달
  const [timeModal, setTimeModal] = useState(false);

  // 권한 모달
  const [gAlertModal, setGAlertModal] = useState(false);

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
        setGAlertModal(true);
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
      if (elapsedTime < 30000) {
        setTimeModal(true);
        // Alert.alert(
        // '녹음이 너무 짧습니다',
        // '녹음은 최소 30초 이상이어야 합니다.',
        // );
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
    setModalVisible(false);
    setTimeModal(false);
    setGAlertModal(false);
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
          style={{
            width: screenWidth * 0.15,
            margin: screenWidth * 0.05,
            marginBottom: -screenWidth * 0.012,
          }}
        />
        <EndRecordModal
          visible={modalVisible}
          onClose={handleModalClose}
          recordingUri={voiceUri} // 녹음된 URI를 넘깁니다
        />
      </View>
      <AlertModal
        isVisible={timeModal}
        text={['녹음이 너무 짧습니다', '녹음은 최소 30초 이상이어야 합니다.']}
        onConfirm={handleModalClose}
      />

      <AlertModal
        isVisible={gAlertModal}
        text={['권한 승인이 거절되었습니다.']}
        onConfirm={handleModalClose}
      />
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
  },
  scriptTextContainer: {
    width: screenWidth * 0.7,
    height: screenHeight * 0.53,
    backgroundColor: '#5FB0CC',
    borderRadius: 15,
    justifyContent: 'center',
  },
  counterText: {
    fontSize: screenWidth * 0.03,
    marginTop: 10,
    fontFamily: 'im-hyemin-bold',
  },
  text: {
    fontSize: screenWidth * 0.032,
    fontFamily: 'im-hyemin-bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: screenHeight * 0.08,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 20,
    borderRadius: 5,
    marginVertical: 5,
  },
  disabledButton: {
    opacity: 0.5,
  },
});
