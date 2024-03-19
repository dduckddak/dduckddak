import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import GreenButton from '../../components/GreenButton';
import { useNavigation } from '@react-navigation/native';

const CreationModal = ({
  creationModalVisible,
  setCreationModalVisible,
}: {
  creationModalVisible: boolean;
  setCreationModalVisible: (visible: boolean) => void;
}) => {
  const navigation = useNavigation();

  return (
    <Modal visible={creationModalVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.endmodalContent}>
          <Text style={styles.modalText}>
            00이가 재료를 모두 찾아준 덕분에 책이 잘 만들어지고 있어! 다
            만들어지면 알려줄게
          </Text>
          <View style={styles.buttonContainer}>
            <GreenButton
              onPress={() => navigation.navigate('home' as never)}
              content="기다리기"
              style={{ width: 250, height: 80, marginTop: 10 }}
            />
            <GreenButton
              onPress={() => setCreationModalVisible(false)}
              content="뒤로가기"
              style={{ width: 250, height: 80, marginTop: 10 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default CreationModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  endmodalContent: {
    backgroundColor: '#519657',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    width: '70%',
    height: '45%',
  },
  modalText: {
    fontFamily: 'im-hyemin-bold',
    color: 'white',
    fontSize: 50,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 20,
  },
});
