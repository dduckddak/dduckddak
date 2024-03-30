import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import GreenButton from '../../components/GreenButton';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../../store/userStore';

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
  // 이걸 어떻게 해야할지 고민
  // 동화생성 완료 후 너가 할지 이름 넣어줄지,,,
  const userName = useUserStore((state) => state.userName);

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
            {userName}이가 재료를 모두 찾아준 덕분에 책이 잘 만들어지고 있어! 다
            만들어지면 알려줄게
          </Text>
          <View style={styles.buttonContainer}>
            <GreenButton
              onPress={makeBookConfirm}
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
