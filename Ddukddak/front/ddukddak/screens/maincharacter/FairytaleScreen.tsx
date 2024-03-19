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
import { NavigationProp } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import GreenButton from '../../components/GreenButton';
import SkyButton from '../../components/SkyButton';
import CreationModal from '../../components/createBook/renderCreationModal';

function FairytaleScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState({
    main: { photo: null, voice: null },
    roles: { photo: null, voice: null },
    narration: { voice: null },
    bookName: '',
  });

  // 나갈때 모달
  const [modalVisible, setModalVisible] = useState(false);
  // 다 만들었을때 모달
  const [creationModalVisible, setCreationModalVisible] = useState(false);

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
    navigation.navigate('picture');
  };

  const recordVoice = async () => {
    navigation.navigate('voice');
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // 여기서 데이터를 서버에 POST 요청
      console.log('Send data to server:', data);
      setCreationModalVisible(true);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const buttonComponent = ({ role }: any) => {
    return (
      <View style={styles.buttoncontainer}>
        <Pressable style={styles.button} onPress={pickImage}>
          <Text style={styles.textcenter}> {role} 얼굴 찾아주기</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={recordVoice}>
          <Text style={styles.textcenter}>{role} 소리 찾아주기</Text>
        </Pressable>
      </View>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return buttonComponent({ role: '주인공' });

      case 2:
        return buttonComponent({ role: '역할1' });
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
          <View style={styles.stepFourContainer}>
            <View>
              <TextInput
                style={styles.textInputStyle}
                placeholder="책 이름 입력"
                onChangeText={(text) => setData({ ...data, bookName: text })}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 10,
                }}
              >
                <GreenButton
                  onPress={handlePreviousStep}
                  content="이전"
                  style={{ width: 100, height: 80, marginTop: 10 }}
                />
                <GreenButton
                  onPress={handleNextStep}
                  content="나만의 동화 만들기"
                  style={{ width: 250, height: 80, marginTop: 10 }}
                />
              </View>
            </View>
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
        source={require('../../assets/images/background/fairybackground.png')}
        style={styles.imageBackground}
      >
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}
        >
          {renderStep()}
          <CreationModal
            creationModalVisible={creationModalVisible}
            setCreationModalVisible={setCreationModalVisible}
          />
          <View style={{ flexDirection: 'row', gap: 20 }}>
            {currentStep > 1 && currentStep < 4 && (
              <GreenButton
                onPress={handlePreviousStep}
                content="이전"
                style={{ width: 100, height: 80, marginTop: 10 }}
              />
            )}
            {currentStep < 4 && (
              <GreenButton
                onPress={handleNextStep}
                content="다 찾았어요"
                style={{ width: 250, height: 80, marginTop: 10 }}
              />
            )}
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
    color: 'black',
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
  stepFourContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 300,
    marginHorizontal: 30,
    marginTop: 20,
    padding: 20,
    backgroundColor: 'rgba(183, 227, 153, 0.66)',
    borderRadius: 15,
  },
  textInputStyle: {
    borderBottomColor: '#519657',
    borderBottomWidth: 2,
    width: '100%',
    padding: 10,
    marginBottom: 20,
    fontFamily: 'im-hyemin-bold',
    fontSize: 18,
  },
});
