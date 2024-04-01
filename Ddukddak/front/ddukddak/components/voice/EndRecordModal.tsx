import React, { useState } from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Pressable,
  Text,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import SkyButton from '../SkyButton';
import { addVoice } from '../../api/voiceApi';
import { useNavigation } from '@react-navigation/native';
import Loading from '../Loading';
import AlertModal from '../AlertModal';

interface VoiceModalProps {
  visible: boolean;
  onClose: () => void;
  recordingUri: string | null;
}

function EndRecordModal({ visible, onClose, recordingUri }: VoiceModalProps) {
  const navigation = useNavigation();
  const [voicename, setVoicename] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 성공 모달
  const [sAlertModal, setSAlertModal] = useState(false);
  // 실패 모달
  const [fAlertModal, setFAlertModal] = useState(false);

  const handleUploadVoice = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
      setSAlertModal(true);
      // Alert.alert('성공', '목소리가 성공적으로 업로드되었습니다.', [
      //   {
      //     text: 'OK',
      //     onPress: () => {
      //       setVoicename(''); // 입력 초기화
      //       onClose(); // 모달 닫기
      //       navigation.navigate('home' as never);
      //     },
      //   },
      // ]); // 성공 후 모달 닫기
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setFAlertModal(true);
      // Alert.alert('업로드 실패', '업로드 중 오류가 발생했습니다.');
    }
  };

  if (isLoading) {
    return (
      <Modal visible={visible} transparent={true} animationType="fade">
        <View style={styles.centeredLoadingView}>
          <Loading />
        </View>
      </Modal>
    );
  }

  const handleSuccess = () => {
    setVoicename('');
    onClose();
    navigation.navigate('home' as never);
  };

  const handleModalClose = () => {
    setFAlertModal(false);
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={onClose}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Pressable style={styles.background} onPress={onClose}>
            <View style={styles.modalBox}>
              <Text style={styles.text}>고생했어!!</Text>
              <Text style={styles.text}>누구의 목소리야??</Text>
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
        </TouchableWithoutFeedback>
      </Modal>
      <AlertModal
        isVisible={sAlertModal}
        text={['사진 업로드 성공 !!']}
        onConfirm={handleSuccess}
      />
      <AlertModal
        isVisible={fAlertModal}
        text={['업로드 실패', '업로드 중 오류가 발생했습니다.']}
        onConfirm={handleModalClose}
      />
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
    width: '70%',
    height: '65%',
    // backgroundColor: '#2B98BB',
    backgroundColor: '#0084BE',
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
    width: '80%',
    padding: 20,
    margin: 20,
    fontSize: 20,
    fontFamily: 'im-hyemin-bold',
    borderRadius: 10,
  },
  centeredLoadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
