import React from 'react';
import { View, Text, StyleSheet, Modal, Dimensions } from 'react-native';
import SkyButton from './SkyButton';

interface AlertModalProps {
  isVisible: boolean;
  text: string[];
  onConfirm: () => void;
}

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const AlertModal: React.FC<AlertModalProps> = ({
  isVisible,
  text,
  onConfirm,
}) => {
  return (
    <Modal visible={isVisible} transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{text.join('\n')}</Text>
          <View style={styles.buttonContainer}>
            <SkyButton
              onPress={onConfirm}
              style={styles.buttonStyle}
              content="확인"
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
    width: screenWidth * 0.5,
    height: screenHeight * 0.35,
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
    fontSize: screenWidth * 0.027,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonStyle: {
    width: screenWidth * 0.14,
  },
});

export default AlertModal;
