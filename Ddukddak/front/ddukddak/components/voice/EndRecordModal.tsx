import React, { useState } from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Pressable,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import SkyButton from '../SkyButton';
import { addVoice } from '../../api/voiceApi';

interface VoiceModalProps {
  visible: boolean;
  onClose: () => void;
  recordingUri: string | null;
}

function EndRecordModal({ visible, onClose, recordingUri }: VoiceModalProps) {
  const [voicename, setVoicename] = useState('');

  const handleUploadVoice = async () => {
    const voiceFile: any = {
      uri: recordingUri,
      type: 'audio/mp3', // 적절한 MIME 타입 지정
      name: `${voicename}.mp3`, // 파일 이름 지정
    };

    try {
      const response = await addVoice({
        voiceFile: voiceFile as File,
        voiceName: voicename,
      });
      Alert.alert('성공', '목소리가 성공적으로 업로드되었습니다.', [
        {
          text: 'OK',
          onPress: () => {
            setVoicename(''); // 입력 초기화
            onClose(); // 모달 닫기
          },
        },
      ]); // 성공 후 모달 닫기
    } catch (error) {
      console.error(error);
      Alert.alert('업로드 실패', '업로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={onClose}
      >
        <Pressable style={styles.background} onPress={onClose}>
          <View style={styles.modalBox}>
            <Text style={styles.text}>고생했어!!</Text>
            <Text style={styles.text}>누구의 목소리일까??</Text>
            <TextInput
              style={styles.input}
              onChangeText={setVoicename}
              value={voicename}
              placeholder="목소리 이름을 입력하세요"
            />
            <SkyButton
              content="전송하기"
              onPress={handleUploadVoice}
              style={styles.button}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

export default EndRecordModal;

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#2B98BB',
    borderRadius: 10,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '20%',
    margin: 20,
  },
  text: {
    color: '#fff',
    margin: 10,
    fontFamily: 'im-hyemin-bold',
    fontSize: 50,
  },
  input: {
    backgroundColor: '#fff',
    width: '60%',
    padding: 20,
    margin: 20,
    fontSize: 20,
    fontFamily: 'im-hyemin-bold',
    borderRadius: 10,
  },
});
