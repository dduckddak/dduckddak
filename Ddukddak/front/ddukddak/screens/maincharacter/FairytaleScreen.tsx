import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Modal,
  Pressable,
  BackHandler,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import GreenButton from '../../components/GreenButton';
import SkyButton from '../../components/SkyButton';

function FairytaleScreen({ navigation }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState({
    redHood: { photo: null, voice: null },
    wolf: { photo: null, voice: null },
    narration: { voice: null },
    bookName: '',
  });

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const backAction = () => {
      setModalVisible(true);

      return true; // 이벤트 처리 완료
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // 컴포넌트가 unmount 될 때 이벤트 제거
  }, []);

  const closeModal = () => {
    setModalVisible(false); // 모달 닫기
    navigation.goBack(); // 뒤로가기
  };

  const pickImage = async () => {
    // 이미지 선택 로직
  };

  const recordVoice = async () => {
    // 오디오 녹음 로직
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // 여기서 데이터를 서버에 POST 요청
      console.log('Send data to server:', data);
    }
  };

  // 이전 단계로
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.buttoncontainer}>
            <Pressable style={styles.button} onPress={pickImage}>
              <Text style={styles.textcenter}>주인공 얼굴 찾아주기</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={recordVoice}>
              <Text style={styles.textcenter}>주인공 소리 찾아주기</Text>
            </Pressable>
          </View>
        );
      case 2:
        return (
          <View style={styles.buttoncontainer}>
            <Pressable style={styles.button} onPress={pickImage}>
              <Text style={styles.textcenter}>역할 얼굴 찾아주기</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={recordVoice}>
              <Text style={styles.textcenter}>역할 소리 찾아주기</Text>
            </Pressable>
          </View>
        );
      case 3:
        return (
          <View>
            <Pressable style={styles.button} onPress={recordVoice}>
              <Text style={styles.textcenter}>내레이션 목소리 녹음</Text>
            </Pressable>
          </View>
        );
      case 4:
        return (
          <View>
            <TextInput
              placeholder="책 이름 입력"
              onChangeText={(text) => setData({ ...data, bookName: text })}
            />
          </View>
        );
      default:
        return <View />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../../assets/images/fairybackground.png')}
        style={styles.imageBackground}
      >
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}
        >
          {renderStep()}
          <View style={{ flexDirection: 'row', gap: 20 }}>
            {currentStep > 1 && (
              <GreenButton
                onPress={handlePreviousStep}
                content="이전"
                style={{ width: 100, height: 80, marginTop: 10 }}
              />
            )}
            <GreenButton
              onPress={handleNextStep}
              content="다 찾았어요"
              style={{ width: 250, height: 80, marginTop: 10 }}
            />
          </View>
        </View>
      </ImageBackground>
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              책 만들기를 그만 하시겠습니까 ?
            </Text>
            <View style={styles.buttonContainer}>
              <SkyButton
                content="나가기"
                onPress={closeModal}
                style={{
                  width: 150,
                  height: 20,
                  marginTop: 20,
                  marginRight: 100,
                }}
              />
              <SkyButton
                content="취소"
                onPress={() => setModalVisible(false)}
                style={{ width: 150, height: 20, marginTop: 20 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default FairytaleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
  },
  buttoncontainer: {
    flexDirection: 'row',
    margin: 30,
    gap: 30,
  },
  button: {
    backgroundColor: '#CDEAB9',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textcenter: {
    fontFamily: 'im-hyemin-bold',
    color: 'rgba(45,45,45)',
    fontSize: 25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#0084BE',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    width: '70%',
    height: '30%',
  },
  modalText: {
    fontFamily: 'im-hyemin-bold',
    color: 'white',
    fontSize: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
