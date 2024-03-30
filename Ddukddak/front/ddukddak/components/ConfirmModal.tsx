import React from 'react';
import { View, Text, StyleSheet, Modal, Button } from 'react-native';
import SkyButton from './SkyButton';

interface ConfirmModalProps {
  isVisible: boolean;
  text: string[];
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isVisible,
  text,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{text.join('\n')}</Text>
          <View style={styles.buttonContainer}>
            <SkyButton
              onPress={onConfirm}
              style={styles.buttonStyle}
              content="그만하기"
            />
            <SkyButton
              onPress={onCancel}
              style={styles.buttonStyle}
              content="계속 만들기"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '70%',
    height: '55%',
    backgroundColor: '#0084BE',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
  modalText: {
    fontFamily: 'im-hyemin-bold',
    color: '#FFFFFF',
    marginBottom: 20,
    fontSize: 48,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonStyle: {
    width: '30%',
  },
});

export default ConfirmModal;
