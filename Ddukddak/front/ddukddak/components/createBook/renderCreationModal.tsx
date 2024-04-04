import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../../store/userStore';
import SkyButton from '../SkyButton';
import Loading from '../Loading';

function attachIga(userName: string): string {
  const slicedUserName = userName.slice(1); // remove first character of user's name
  const lastWord = userName.charAt(userName.length-1); // get last character of user's name

  const korBegin = 0xAC00;
  const korEnd = 0xD7A3;
  const lastWordCode = lastWord.charCodeAt(0);

  // 종성있으면 '이'붙여서 없으면 그냥 이름
  if (korBegin <= lastWordCode && lastWordCode <= korEnd) {
    const korJong = (lastWordCode - korBegin) % 28;
    if (korJong !== 0) {
      return slicedUserName + "이";
    }
    else {
      return slicedUserName;
    }
  }
  return userName;
}


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
  const modifiedUserName = attachIga(userName);


  const makeBookConfirm = async () => {
    // setIsLoading(true);
    const success = await handleMakeBook();

    if (success) {
      // setIsLoading(false);
      navigation.navigate('home' as never);
    } else {
      // setIsLoading(false);
      console.log('뭔가잘못됨...');
    }
  };

  // if (isLoading) {
  //   return (
  //     <Modal visible={isLoading} transparent={true} animationType="fade">
  //       <View style={styles.centeredLoadingView}>
  //         <Loading />
  //       </View>
  //     </Modal>
  //   );
  // }

  return (
    <Modal visible={creationModalVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.endmodalContent}>
          <Text style={styles.modalText}>
            {modifiedUserName}가 재료를 모두 찾아준 덕분에
            {'\n'}책이 잘 만들어지고 있어!
            {'\n'}다 만들어지면 알려줄게
          </Text>
          <View style={styles.buttonContainer}>
            <SkyButton
              onPress={makeBookConfirm}
              content="기다리기"
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
  centeredLoadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
