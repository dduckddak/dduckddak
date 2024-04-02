import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Pressable,
  Image,
  Dimensions,
  Animated,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GreenButton from '../../components/GreenButton';
import CreationModal from '../../components/createBook/renderCreationModal';
import { useFairyStore } from '../../store/fairyStore';
import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import {
  BookSummary,
  DetailBook,
  PhotoData,
  VoiceData,
} from '../../types/types';
import ConfirmModal from '../../components/ConfirmModal';
import { postMakeBook } from '../../api/makeBookApi';
import { useUserStore } from '../../store/userStore';
import Loading from '../../components/Loading';

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
  const [isMakeLoading, setIsMakeLoading] = useState<boolean>(false);

  const { mainImage, mainVoice, subImage, subVoice, narration, resetStore } =
    useFairyStore(); // zustand 상태 변수, 함수

  const [isExitModal, setIsExitModal] = useState(false); // 나갈때 모달
  const [goBackAction, setGoBackAction] = useState(); // navigation의 goBack 이벤트를 보류해놓기 위한 state

  const [isMakeBookModal, setIsMakeBookModal] = useState(false); // 다 만들었을때 모달

  const route = useRoute<FairyRouteProp>();
  const selectedBook: DetailBook = route.params.selectedBook; // DetailScreen에서 받아온 책 정보 (DetailBook 타입)
  const bookSummary: BookSummary = route.params.bookSummary; // DetailScreen에서 받아온 책 정보 (BookSummary 타입)

  // 성별에 따라 뚝이 / 딱이 다르게 나오기
  const userSex = useUserStore((state) => state.sex);
  const [mainPageCharacter, setMainPageCharacter] = useState();
  const updateMainImage = () => {
    if (userSex === 'M') {
      setMainPageCharacter(require('../../assets/images/DD/뚝이3.png'));
    } else {
      setMainPageCharacter(require('../../assets/images/DD/딱이.png'));
    }
  };

  // 컴포넌트가 마운트될 때 뚝이와 딱이를 성별에 따라 다르게 나오기 위한 함수 실행
  useEffect(() => {
    updateMainImage();
  }, []);

  // 뒤로가기 관련 설정 시작

  // 뒤로가기가 실행되면 goBack을 함수의 event를 보류하여 저장해놓은 뒤, modal을 열어준다
  const checkCanGoBack = useCallback((e: any) => {
    e.preventDefault();

    setIsExitModal(true);
    setGoBackAction(e.data.action);
  }, []);

  // 컴포넌트 마운트가 해제되기전에 실행될 함수를 마운트 해준다.
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', checkCanGoBack);
    return unsubscribe;
  }, [checkCanGoBack]);

  // 뒤로가기를 눌렀을 때 나타나는 modal을 confirm했을 때 모달을 닫고, 스토어를 초기화한 후 뒤로가기를 수행한다.
  const closeModal = () => {
    setIsExitModal(false); // 모달 닫기
    resetStore(); // zustand의 voice, image 선택한 데이터들 초기화
    if (goBackAction) navigation.dispatch(goBackAction); // 보류되었던 뒤로가기를 수행함
    // @ts-ignore
    setGoBackAction(null);
  };

  // 뒤로가기 관련 설정 끝

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

    setIsMakeLoading(true);
    navigation.removeListener('beforeRemove', checkCanGoBack);
    // const response = await postMakeBook(requestBody);
    postMakeBook(requestBody);
    resetStore();
    return true;
    // console.log(response);

    // return response.message === 'Success.';
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
        <Image
          source={require('../../assets/images/books/findfin.png')}
          style={styles.findfin}
        />
        <View style={{ flex: 4 }}>
          {/* <Text>재료를 모두 찾아줘서 고마워</Text> */}
        </View>
        <View style={styles.narrationButtonContainer}>
          <Image
            source={require('../../assets/images/books/snail.png')}
            style={styles.snail}
          />
          <Image
            source={require('../../assets/images/books/snail.png')}
            style={styles.snail2}
          />
          <Pressable
            style={styles.narrationVoiceSelectButton}
            onPress={() => selectCharacterVoice('내래이션')}
          >
            {!narration ? (
              <Text style={styles.textcenter}>
                누구의 목소리로{'\n'}들을지 선택하기
              </Text>
            ) : (
              <Text style={styles.textcenter}>
                {narration.voiceName}
                {'\n'}목소리로 듣기
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
        <View style={{ flex: 3 }}>
          <Image
            source={require('../../assets/images/books/naming.png')}
            style={styles.naming}
          />
        </View>
        <View
          style={{
            flex: 4,
            right: -screenWidth * 0.01,
            top: screenHeight * 0.04,
          }}
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
            {/* <Text>이 박스에 딱이 들어감</Text> */}
            {mainPageCharacter && (
              <Image source={mainPageCharacter} style={styles.ddak2} />
            )}
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
        btnConfirmText={'그만하기'}
        btnCancelText={'돌아가기'}
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
  cloud: { position: 'absolute', top: 50, left: 10, width: 150, height: 130 },
  cloud1: { position: 'absolute', top: 25, left: 250, width: 200, height: 130 },

  cloud2: {
    position: 'absolute',
    top: 5,
    left: 600,
    width: 200,
    height: 150,
    transform: [{ scaleX: -1 }],
  },
  cloud3: { position: 'absolute', top: 100, left: 1000 },
  ddak2: {
    position: 'absolute',
    left: 50,
    top: 230,
    width: 300,
    height: 330,
  },
  tree1: {
    position: 'absolute',
    top: 113,
    width: 360,
    height: 452,
  },
  tree2: {
    position: 'absolute',
    top: 113,
    left: 421,
    width: 360,
    height: 452,
  },
  find: {
    position: 'absolute',
    bottom: 10,
    right: 410,
    width: 750,
    height: 132,
  },
  snail: {
    position: 'absolute',
    bottom: 5,
    right: 12,
    width: 422,
    height: 325,
  },
  snail2: {
    position: 'absolute',
    bottom: 15,
    right: 540,
    width: 211,
    transform: [{ scaleX: -1 }],
    height: 173,
  },
  findfin: {
    position: 'absolute',
    top: -25,
    right: 290,
  },
  naming: {
    position: 'absolute',
    top: 30,
    right: 157,
  },
  findtext: {
    position: 'absolute',
    fontFamily: 'im-hyemin-bold',
    fontSize: 40,
    right: 495,
    bottom: 52,
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
    gap: 152,
    marginHorizontal: 36,
  },
  button: {
    backgroundColor: '#6AC460',
    borderRadius: 500,
    height: 263,
    width: 263,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textcenter: {
    fontFamily: 'im-hyemin-bold',
    textAlign: 'center',
    color: 'black',
    fontSize: 35,
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
  },

  narrationVoiceSelectButton: {
    height: 165,
    width: 375,
    marginRight: 22,
  },

  titleInputBox: {
    backgroundColor: '#C8E8B2',
    width: 625,
    height: 285,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 30,
    gap: 10,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#519567',
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
