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

interface VoiceModalProps {
  visible: boolean;
  onClose: () => void;
  recordingUri: string | null;
  CompletePress: () => void;
}

function EndRecordModal({
  visible,
  onClose,
  recordingUri,
  CompletePress,
}: VoiceModalProps) {
  const [voicename, setVoicename] = useState('');

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
              onPress={CompletePress}
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
    width: '100%',
    backgroundColor: '#2B98BB',
    borderRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 100,
  },
  button: {
    width: '20%',
    margin: 20,
  },
  text: {
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 10,
    marginBottom: 20,
  },
});
