import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Modal,
  Pressable,
  BackHandler,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import GreenButton from '../../components/GreenButton';
import SkyButton from '../../components/SkyButton';
import CreationModal from '../../components/createBook/renderCreationModal';
import Fairystore from '../../store/Fairystore';

function FairytaleScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState({
    main: { photo: null as string | null, voice: null as string | null },
    sub: { photo: null as string | null, voice: null as string | null },
    narration: { voice: null as string | null },
    bookName: '',
  });

  // 나갈때 모달
  const [modalVisible, setModalVisible] = useState(false);
  // 다 만들었을때 모달
  const [creationModalVisible, setCreationModalVisible] = useState(false);
  const [bookName, setBookName] = useState('');

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

  // const sendData = async () => {
  //   const payload = {
  //     bookId: 0, // bookId는 예시 값입니다. 실제 애플리케이션의 요구사항에 따라 변경해야 할 수 있습니다.
  //     makeBookTitle: bookName,
  //     mainVoice: mainVoiceUri, // 여기서는 URI를 보내고 있지만, 실제로는 서버에서 요구하는 형식에 맞게 변환할 필요가 있을 수 있습니다.
  //     mainPhoto: mainImageUri,
  //     subVoice: rolesVoiceUri,
  //     subPhoto: rolesImageUri,
  //     narration: narrationVoiceUri,
  //   };

  //   try {
  //     const response = await axios.post('/api/v1/make-books', payload);
  //     console.log('Success:', response.data);
  //   } catch (error) {
  //     console.error('Error sending data:', error);
  //   }
  // };

  const closeModal = () => {
    setModalVisible(false); // 모달 닫기
    navigation.goBack(); // 뒤로가기
  };
  const updateSelectedImage = (uri: any) => {
    setData((prevData) => ({
      ...prevData,
      main: { ...prevData.main, photo: uri },
      sub: { ...prevData.sub, voice: uri },
      narration: { ...prevData.narration, voice: uri },
      bookName: '',
    }));
  };

  const pickImage = async (role: string) => {
    // 선택된 사진을 처리하는 콜백 함수
    const onPictureSelected = (uri: string) => {
      setData((prevData) => {
        const newData = { ...prevData };
        if (role === '주인공') {
          newData.main.photo = uri;
        } else if (role === '역할1') {
          newData.sub.photo = uri; // 'roles' 구조에 맞게 조정이 필요할 수 있음
        }
        // 여기에 다른 역할에 대한 처리를 추가할 수 있습니다.
        return newData;
      });
    };

    navigation.navigate('addfairypicture', {
      role,
      onPictureSelected: updateSelectedImage,
    });
  };

  const recordVoice = async (role: string) => {
    navigation.navigate('addfairyvoice', { role });
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
        <Pressable style={styles.button} onPress={() => pickImage(role)}>
          <Text style={styles.textcenter}> {role} 얼굴 찾아주기</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => recordVoice(role)}>
          <Text style={styles.textcenter}>{role} 소리 찾아주기</Text>
        </Pressable>
      </View>
    );
  };

  const handleBookNameChange = (name: string) => {
    setBookName(name); // 사용자가 입력한 책 이름을 저장
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
            <Pressable
              style={styles.button}
              onPress={() => recordVoice('내래이션')}
            >
              <Text style={styles.textcenter}>내레이션 목소리 녹음</Text>
            </Pressable>
          </View>
        );
      case 4:
        return (
          <View style={styles.stepFourContainer}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="책 이름 입력"
                  value={data.bookName || ''}
                  onChangeText={handleBookNameChange}
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
            </TouchableWithoutFeedback>
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
                style={{
                  width: 100,
                  height: 80,
                  marginTop: 10,
                  marginRight: 30,
                }}
              />
            )}
            {currentStep < 4 && (
              <GreenButton
                onPress={handleNextStep}
                content="다 찾았어요"
                style={{
                  width: 250,
                  height: 80,
                  marginTop: 10,
                  marginRight: 30,
                }}
              />
            )}
          </View>
        </View>
      </ImageBackground>
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              책 만들기를 그만 하시겠습 니까 ?
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
