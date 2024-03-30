import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import GreenButton from '../../components/GreenButton';
import { useNavigation } from '@react-navigation/native';
import SkyButton from '../SkyButton';

const CreationModal = ({
  creationModalVisible,
  setCreationModalVisible,
  handleMakeBook,
}: {
  creationModalVisible: boolean;
  setCreationModalVisible: (visible: boolean) => void;
  handleMakeBook: () => Promise<boolean>;
}) => {
  const navigation = useNavigation();

  const makeBookConfirm = async () => {
    const success = await handleMakeBook();

    if (success) {
      navigation.navigate('home' as never);
    } else {
      console.log('뭔가잘못됨...');
    }
  };

  return (
    <Modal visible={creationModalVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.endmodalContent}>
          <Text style={styles.modalText}>
            00이가 재료를 모두 찾아준 덕분에
            {'\n'}책이 잘 만들어지고 있어!
            {'\n'}다 만들어지면 알려줄게
          </Text>
          <View style={styles.buttonContainer}>
            <SkyButton
              onPress={makeBookConfirm}
              content="책 만들기"
              style={{
                width: 250,
                height: 80,
                marginTop: 10,
                marginHorizontal: 10,
              }}
            />
            <SkyButton
              onPress={() => setCreationModalVisible(false)}
              content="만들기 취소"
              style={{
                width: 250,
                height: 80,
                marginTop: 10,
                marginHorizontal: 10,
              }}
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
    backgroundColor: '#0084BE',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    width: '70%',
    height: '60%',
    justifyContent: 'center',
  },
  modalText: {
    fontFamily: 'im-hyemin-bold',
    color: 'white',
    fontSize: 50,
    textAlign: 'center',
    lineHeight: 80,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 20,
  },
});
