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
  Image,
  Dimensions,
  Animated,
} from 'react-native';

import GreenButton from '../../components/GreenButton';
import SkyButton from '../../components/SkyButton';
import CreationModal from '../../components/createBook/renderCreationModal';
import { useFairyStore } from '../../store/fairyStore';
import { NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import {
  BookSummary,
  DetailBook,
  PhotoData,
  VoiceData,
} from '../../types/types';
import ConfirmModal from '../../components/ConfirmModal';
import { postMakeBook } from '../../api/makeBookApi';

type FairyRouteProp = RouteProp<RootStackParamList, 'fairy'>;
const CloudAnimation = ({ children }: { children: React.ReactNode }) => {
  const [cloudAnimationValue] = useState(new Animated.Value(0));

  useEffect(() => {
    const animateClouds = () => {
      const cloudAnimation = Animated.sequence([
        Animated.timing(cloudAnimationValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(cloudAnimationValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]);

      Animated.loop(cloudAnimation).start();
    };
    animateClouds();
    return () => {};
  }, [cloudAnimationValue]);
  const cloud1TranslateY = cloudAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, -40],
  });
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 45,
        left: 50,
        width: 200,
        height: 130,
        transform: [{ translateY: cloud1TranslateY }],
      }}
    >
      {children}
    </Animated.View>
  );
};

function FairytaleScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const [currentStep, setCurrentStep] = useState(1); // 현재 진행 단계(1 : 메인 캐릭터 2: 서브 캐릭 3 : 내레이션 4 : 만들기)
  const [makeBookTitle, setMakeBookTitle] = useState(''); // 클라이언트가 자신이 만들 책 제목을 지정하기 위한 state

  const { mainImage, mainVoice, subImage, subVoice, narration, resetStore } =
    useFairyStore(); // zustand 상태 변수, 함수

  const [isExitModal, setIsExitModal] = useState(false); // 나갈때 모달
  const [isMakeBookModal, setIsMakeBookModal] = useState(false); // 다 만들었을때 모달

  const route = useRoute<FairyRouteProp>();
  const selectedBook: DetailBook = route.params.selectedBook; // DetailScreen에서 받아온 책 정보 (DetailBook 타입)
  const bookSummary: BookSummary = route.params.bookSummary; // DetailScreen에서 받아온 책 정보 (BookSummary 타입)

  useEffect(() => {
    const backAction = () => {
      setIsExitModal(true);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove(); // 컴포넌트가 unmount 될 때 이벤트 제거
  }, []);

  const closeModal = () => {
    setIsExitModal(false); // 모달 닫기
    resetStore();
    navigation.goBack(); // 뒤로가기
  };

  const handleMakeBook = async () => {
    const requestBody = {
      bookId: bookSummary.bookId,
      makeBookTitle: makeBookTitle,
      mainVoice: mainVoice?.voiceId,
      mainPhoto: mainImage?.photoId,
      subVoice: subVoice?.voiceId,
      subPhoto: subImage?.photoId,
      narration: narration?.voiceId,
    };
    console.log(requestBody);

    const response = await postMakeBook(requestBody);
    resetStore();
    console.log(response);

    return response.message === 'Success.';
  };

  /**
   * @function selectCharacterImage
   * @description 동화뚝딱에서 특정 캐릭터의 이미지를 선택하는 화면으로 이동. 이 때 currentStep을 이용해서 메인, 서브를 구분한다.
   */
  const selectCharacterImage = async (role: string) => {
    navigation.navigate('addfairypicture', { currentStep, role });
  };

  /**
   * @function selectCharacterVoice
   * @description 동화뚝딱에서 특정 캐릭터의 목소리를 선택하는 화면으로 이동. 이 때 currentStep을 이용해서 메인, 서브, 내래이션을 구분한다.
   */
  const selectCharacterVoice = async (role: string) => {
    navigation.navigate('addfairyvoice', { currentStep, role });
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // 여기서 데이터를 서버에 POST 요청
      // console.log('Send data to server:', data);
      setIsMakeBookModal(true);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const buttonComponent = ({
    role,
    image,
    voice,
  }: {
    role: string;
    image: PhotoData | null;
    voice: VoiceData | null;
  }) => {
    return (
      <View style={styles.rightSideContainer}>
        <View style={{ flex: 1 }}>
          {/* <Text> {role}의 얼굴과 목소리를 찾아줘</Text> */}
        </View>
        <Image
          source={require('../../assets/images/books/tree.png')}
          style={styles.tree1}
        />
        <Image
          source={require('../../assets/images/books/tree.png')}
          style={styles.tree2}
        />
        <View style={styles.characterButtonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => selectCharacterImage(role)}
          >
            {
              !image ? (
                <Text style={styles.textcenter}>얼굴{'\n'}찾아주기</Text> // 이미지가 없으면 '얼굴 찾아주기'
              ) : (
                <Image
                  source={{ uri: image.photoFile }}
                  style={styles.imageInButton}
                />
              ) // 이미지가 있으면 이미지 렌더링
            }
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => selectCharacterVoice(role)}
          >
            {!voice ? (
              <Text style={styles.textcenter}>목소리{'\n'}찾아주기</Text>
            ) : (
              <Text style={styles.textcenter}>
                {voice.voiceName}
                {'\n'}목소리
              </Text>
            )}
          </Pressable>
        </View>
        <Text style={[styles.findtext]}> {role}의 얼굴과 목소리를 찾아줘</Text>
        <Image
          source={require('../../assets/images/books/find.png')}
          style={styles.find}
        />
        <View style={styles.handleStepContainer}>
          {currentStep > 1 && currentStep < 4 && (
            <GreenButton
              onPress={handlePreviousStep}
              content="이전"
              style={{
                width: screenWidth * 0.08,
              }}
            />
          )}

          <GreenButton
            onPress={handleNextStep}
            content="다 찾았어요"
            style={{
              width: screenWidth * 0.15,

              marginLeft: 30,
            }}
          />
        </View>
      </View>
    );
  };

  const narrationSelectComponent = () => {
    return (
      <View style={styles.rightSideContainer}>
        <View style={{ flex: 4 }}>
          <Text>재료를 모두 찾아줘서 고마워</Text>
        </View>
        <View style={styles.narrationButtonContainer}>
          <Pressable
            style={styles.narrationVoiceSelectButton}
            onPress={() => selectCharacterVoice('내래이션')}
          >
            {!narration ? (
              <Text style={styles.textcenter}>목소리{'\n'}찾아주기</Text>
            ) : (
              <Text style={styles.textcenter}>
                {narration.voiceName}
                {'\n'}목소리
              </Text>
            )}
          </Pressable>
        </View>
        <View style={styles.handleStepContainer}>
          <GreenButton
            onPress={handlePreviousStep}
            content="이전"
            style={{
              width: screenWidth * 0.08,
            }}
          />
          <GreenButton
            onPress={handleNextStep}
            content="다 찾았어요"
            style={{
              width: screenWidth * 0.15,
              marginLeft: 30,
            }}
          />
        </View>
      </View>
    );
  };

  const inputBookTitleContainer = () => {
    return (
      <View style={styles.rightSideContainer}>
        <View style={{ flex: 3, borderWidth: 1 }}>
          <Text>
            이제 조금만 기다리면 책이 만들어질거야!{'\n'}이름을 지어줄래?
          </Text>
        </View>
        <View
          style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={styles.titleInputBox}>
            <TextInput
              style={styles.titleInput}
              placeholder="여기에 입력하세요"
              onChangeText={(text) => setMakeBookTitle(text)}
              value={makeBookTitle}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginBottom: '5%',
              }}
            >
              <GreenButton
                onPress={handlePreviousStep}
                content="이전"
                style={{
                  width: '15%',
                }}
              />
              <GreenButton
                onPress={() => setIsMakeBookModal(true)}
                content="나만의 동화책 만들기"
                style={{
                  width: '60%',
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  const handleBookNameChange = (name: string) => {
    setMakeBookTitle(name); // 사용자가 입력한 책 이름을 저장
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return buttonComponent({
          role: selectedBook.mainName,
          image: mainImage,
          voice: mainVoice,
        });
      case 2:
        return buttonComponent({
          role: selectedBook.subName,
          image: subImage,
          voice: subVoice,
        });
      case 3:
        return narrationSelectComponent();
      case 4:
        return inputBookTitleContainer();
      default:
        return <View />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../../assets/images/background/background4.jpg')}
        style={styles.imageBackground}
      >
        <CloudAnimation>
          <Image
            source={require('../../assets/images/Main/cloud.png')}
            style={styles.cloud}
          />
        </CloudAnimation>
        <CloudAnimation>
          <Image
            source={require('../../assets/images/Main/cloud.png')}
            style={styles.cloud1}
          />
        </CloudAnimation>
        <CloudAnimation>
          <Image
            source={require('../../assets/images/Main/cloud.png')}
            style={styles.cloud2}
          />
        </CloudAnimation>
        <CloudAnimation>
          <Image
            source={require('../../assets/images/Main/cloud.png')}
            style={styles.cloud3}
          />
        </CloudAnimation>
        {/* 로고 영역 비워놓으려고 빈 View*/}
        {/* <View style={{ flex: 1 }}></View> */}
        <View
          style={{
            flex: 8,
            justifyContent: 'space-between',
            borderWidth: 1,
            flexDirection: 'row',
          }}
        >
          {/* 딱이 들어갈 영역 화면 좌측 1 : 2 찾아주기 버튼들 나올 영역*/}
          <View style={styles.leftSideContainer}>
            <Text>이 박스에 딱이 들어감</Text>
          </View>
          {renderStep()}
        </View>
      </ImageBackground>

      {/* 모달 영역 */}
      <ConfirmModal
        isVisible={isExitModal}
        text={['책 만들기를 그만 하시겠습니까?']}
        onConfirm={closeModal}
        onCancel={() => setIsExitModal(false)}
      />
      <CreationModal
        creationModalVisible={isMakeBookModal}
        setCreationModalVisible={setIsMakeBookModal}
        handleMakeBook={handleMakeBook}
      />
      {/* 모달 영역 */}
    </View>
  );
}

export default FairytaleScreen;

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cloud: {
    position: 'absolute',
    top: screenHeight * 0.05,
    left: screenWidth * 0.01,
  },
  cloud1: {
    position: 'absolute',
    top: screenHeight * 0.1,
    left: screenWidth * 0.15,
    width: screenWidth * 0.155,
    height: screenHeight * 0.155,
  },
  cloud2: {
    position: 'absolute',
    top: screenHeight * 0.03,
    left: screenWidth * 0.54,
    width: screenWidth * 0.13,
    height: screenHeight * 0.14,
    transform: [{ scaleX: -1 }],
  },
  cloud3: {
    position: 'absolute',
    top: screenHeight * 0.05,
    left: screenWidth * 0.85,
  },
  tree1: {
    position: 'absolute',
    top: Dimensions.get('screen').height * 0.15,
    width: Dimensions.get('screen').width * 0.3,
    height: Dimensions.get('screen').height * 0.6,
  },
  tree2: {
    position: 'absolute',
    top: Dimensions.get('screen').height * 0.15,
    left: Dimensions.get('screen').width * 0.35,
    width: Dimensions.get('screen').width * 0.3,
    height: Dimensions.get('screen').height * 0.6,
  },
  find: {
    position: 'absolute',
    bottom: Dimensions.get('screen').height * 0.02,
    right: Dimensions.get('screen').width * 0.33,
    width: Dimensions.get('screen').width * 0.61,
    height: Dimensions.get('screen').height * 0.17,
  },
  findtext: {
    position: 'absolute',
    fontFamily: 'im-hyemin-bold',
    fontSize: 40,
    right: Dimensions.get('screen').width * 0.41,
    bottom: Dimensions.get('screen').height * 0.07,
    zIndex: 999,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  rightSideContainer: {
    flex: 2,
    flexDirection: 'column',
  },
  leftSideContainer: {
    flex: 1,
  },

  characterButtonContainer: {
    flex: 3,
    flexDirection: 'row',
    gap: Dimensions.get('screen').width * 0.126,
    marginHorizontal: Dimensions.get('screen').width * 0.03,
  },
  button: {
    backgroundColor: '#6AC460',
    borderRadius: 500,
    height: screenHeight * 0.35,
    width: screenHeight * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textcenter: {
    fontFamily: 'im-hyemin-bold',
    textAlign: 'center',
    color: 'black',
    fontSize: screenWidth > 500 ? 35 : 20,
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

  handleStepContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  imageInButton: {
    width: '80%',
    height: '80%',
    borderRadius: 500,
  },

  narrationButtonContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },

  narrationVoiceSelectButton: {
    backgroundColor: '#CDEAB9',
    borderRadius: 500,
    height: screenHeight * 0.25,
    width: screenHeight * 0.25,
    marginRight: screenHeight * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleInputBox: {
    backgroundColor: '#C8E8B2',
    width: '80%',
    height: '80%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  titleInput: {
    width: '75%',
    alignSelf: 'center',
    borderBottomColor: '#519567',
    borderBottomWidth: 6,
    textAlign: 'center',
    marginBottom: '5%',
    fontSize: 35,
    fontFamily: 'im-hyemin-bold',
    // color: 'white',
  },
});
