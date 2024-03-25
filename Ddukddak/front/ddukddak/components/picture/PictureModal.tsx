import React from 'react';
import { StyleSheet, Modal, View, Pressable, Text } from 'react-native';
import SkyButton from '../SkyButton';
import { Feather } from '@expo/vector-icons';

interface UploadModeModalProps {
  visible: boolean;
  onClose: () => void;
  onLaunchCamera: () => void;
  onLaunchImageLibrary: () => void;
}

function PictureModal({
  visible,
  onClose,
  onLaunchCamera,
  onLaunchImageLibrary,
}: UploadModeModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.background} onPress={onClose}>
        <View style={styles.modalBox}>
          {/* android_ripple 쓰면 클릭시 물결 표시 */}
          <SkyButton
            content="카메라로 촬영"
            onPress={() => {
              onLaunchCamera();
              onClose();
            }}
            style={styles.button}
          />

          <SkyButton
            content="앨범에서 선택"
            onPress={() => {
              onLaunchImageLibrary();
              onClose();
            }}
            style={styles.button}
          />
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
});

export default PictureModal;
