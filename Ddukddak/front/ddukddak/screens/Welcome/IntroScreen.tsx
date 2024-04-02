import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import MainScreen from './MainScreen';
import * as SecureStore from 'expo-secure-store';
import { useUserStore } from '../../store/userStore';
import { Audio } from 'expo-av';

interface MainScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const Intro: React.FC<MainScreenProps> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const userSex = useUserStore((state) => state.sex);
  const [mainPageCharacter, setMainPageCharacter] = useState();
  const [soundObject, setSoundObject] = useState<Audio.Sound>();

  const handleNextStep = async () => {
    if (soundObject) {
      await soundObject.stopAsync();
    }
    setCurrentStep((prevStep) => (prevStep < 6 ? prevStep + 1 : prevStep));
  };
  const handlePreviousStep = () =>
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));

  const handlePress = () => {
    navigation.navigate('MainCharacterScreen');
  };

  const characterName = userSex === 'M' ? '뚝이' : '딱이';

  const ddukFiles = [
    require('../../assets/sound/dduk_1.mp3'),
    require('../../assets/sound/dduk_2.mp3'),
    require('../../assets/sound/dduk_3.mp3'),
    require('../../assets/sound/dduk_4.mp3'),
    require('../../assets/sound/dduk_5.mp3'),
  ];

  const ddakFiles = [
    require('../../assets/sound/ddak_1.mp3'),
    require('../../assets/sound/ddak_2.mp3'),
    require('../../assets/sound/ddak_3.mp3'),
    require('../../assets/sound/ddak_4.mp3'),
    require('../../assets/sound/ddak_5.mp3'),
  ];

  useEffect(() => {
    const setIntroCheck = async () => {
      await SecureStore.setItemAsync('introChecked', 'true');
    };

    setIntroCheck();

    const updateMainImage = () => {
      if (userSex === 'M') {
        setMainPageCharacter(require('../../assets/images/DD/뚝이3.png'));
      } else {
        setMainPageCharacter(require('../../assets/images/DD/딱이.png'));
      }
    };

    let isMounted = true; // 컴포넌트 마운트 상태를 추적하는 플래그

    const loadVoice = async () => {
      // currentStep에 해당하는 음성 파일이 유효한지 확인
      const source =
        userSex === 'M'
          ? ddukFiles[currentStep - 1]
          : ddakFiles[currentStep - 1];
      if (!source || !isMounted) {
        return;
      }
      // 현재 재생 중인 소리가 있으면 멈추고 언로드
      if (soundObject) {
        await soundObject.stopAsync();
        await soundObject.unloadAsync();
      }

      // 새 소리 로드
      const voiceFile =
        userSex === 'M'
          ? ddukFiles[currentStep - 1]
          : ddakFiles[currentStep - 1];
      const newSoundObject = new Audio.Sound();

      try {
        await newSoundObject.loadAsync(voiceFile);
        await newSoundObject.playAsync();
        setSoundObject(newSoundObject); // 상태 업데이트
      } catch (error) {
        console.error('Error loading voice:', error);
      }
    };

    updateMainImage();
    loadVoice();

    return () => {
      isMounted = false;
      soundObject?.unloadAsync(); // 컴포넌트 언마운트 시 언로드
    };
  }, [currentStep, userSex]);

  const YourComponent: React.FC<{ currentStep: number }> = ({
    currentStep,
  }) => {
    let mainScreenContent;
    switch (currentStep) {
      case 1:
        mainScreenContent = (
          <ImageBackground
            source={require('../../assets/images/background/MainBackground.png')}
            style={styles.imageBackground}
          >
            <View style={styles.mainContainer}>
              <View style={styles.leftContainer}>
                <Pressable
                  onPress={handlePress}
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? .3 : 1,
                    },

                  ]}
                >
                  <Image
                    source={require('../../assets/images/Main/maincharacter.png')}
                    style={styles.greenButton}
                  />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('mybook')}>
                  <Image
                    source={require('../../assets/images/Main/books.png')}
                    style={styles.bookicon}
                  />
                </Pressable>
              </View>

              <View style={styles.rightContainer}>
                <Pressable onPress={() => navigation.navigate('picture')}>
                  <Image
                    source={require('../../assets/images/Main/picture.png')}
                    style={styles.icon}
                  />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('voice')}>
                  <Image
                    source={require('../../assets/images/Main/voice.png')}
                    style={styles.icon}
                  />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('coloringList')}>
                  <Image
                    source={require('../../assets/images/Main/color.png')}
                    style={styles.icon}
                  />
                </Pressable>
              </View>

              <View style={styles.speechBubble}>
                {userSex === 'M' ? (
                  <Image
                    source={require('../../assets/images/Main/뚝이gif2.gif')}
                    style={styles.ddak}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/Main/딱이zip.gif')}
                    style={styles.ddak}
                  />
                )}
                <Image
                  source={require('../../assets/images/Main/ballon.png')}
                  style={styles.ballon}
                />
                <Text style={styles.ballontext}>
                  안녕? {'\n'}난 {characterName}야!{'\n'}
                  뚝딱마을에 온 걸{'\n'} 환영해!
                </Text>
              </View>
            </View>
          </ImageBackground>
        );
        break;
      case 2:
        mainScreenContent = (
          <ImageBackground
            source={require('../../assets/images/background/MainBackground.png')}
            style={styles.imageBackground}
          >
            <View style={styles.mainContainer}>
              <View style={styles.leftContainer}>
                <Pressable
                  onPress={handlePress}
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? .3 : 1,
                    },

                  ]}
                >
                  <Image
                    source={require('../../assets/images/Main/maincharacter.png')}
                    style={styles.greenButton}
                  />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('mybook')}>
                  <Image
                    source={require('../../assets/images/Main/books.png')}
                    style={styles.bookicon}
                  />
                </Pressable>
              </View>

              <View style={styles.rightContainer}>
                <Pressable onPress={() => navigation.navigate('picture')}>
                  <Image
                    source={require('../../assets/images/Main/picture.png')}
                    style={styles.icon}
                  />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('voice')}>
                  <Image
                    source={require('../../assets/images/Main/voice.png')}
                    style={styles.icon}
                  />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('coloringList')}>
                  <Image
                    source={require('../../assets/images/Main/color.png')}
                    style={styles.icon}
                  />
                </Pressable>
              </View>

              <View style={styles.speechBubble}>
                {userSex === 'M' ? (
                  <Image
                    source={require('../../assets/images/Main/뚝이gif2.gif')}
                    style={styles.ddak}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/Main/딱이zip.gif')}
                    style={styles.ddak}
                  />
                )}
                <Image
                  source={require('../../assets/images/Main/ballon.png')}
                  style={styles.ballon}
                />
                <Text style={styles.ballontext}>
                  동화 속{'\n'}주인공이{'\n'} 되어보고 싶지 {'\n'}않았니?
                </Text>
              </View>
            </View>
          </ImageBackground>
        );
        break;
      case 3:
        mainScreenContent = (
          <ImageBackground
            source={require('../../assets/images/background/MainBackground.png')}
            style={styles.imageBackground}
          >
            <View style={styles.mainContainer}>
              <View style={styles.leftContainer}>
                <Pressable
                  onPress={handlePress}
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? .3 : 1,
                    },

                  ]}
                >
                  <Image source={mainPageCharacter} style={styles.ddak2} />
                  <Image
                    source={require('../../assets/images/Main/maincharacter.png')}
                    style={styles.greenButton}
                  />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('mybook')}>
                  <Image
                    source={require('../../assets/images/Main/books.png')}
                    style={styles.bookicon1}
                  />
                </Pressable>
              </View>

              <View style={styles.rightContainer}>
                <View style={styles.iconOverlay}>
                  <Pressable onPress={() => navigation.navigate('picture')}>
                    <Image
                      source={require('../../assets/images/Main/picture.png')}
                      style={styles.icon}
                    />
                  </Pressable>
                </View>
                <Pressable onPress={() => navigation.navigate('voice')}>
                  <Image
                    source={require('../../assets/images/Main/voice.png')}
                    style={styles.icon}
                  />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('coloringList')}>
                  <Image
                    source={require('../../assets/images/Main/color.png')}
                    style={styles.icon}
                  />
                </Pressable>
              </View>

              <View style={styles.speechBubble}>
                <Image
                  source={require('../../assets/images/Main/ballon2.png')}
                  style={styles.ballon2}
                />
                <Text style={styles.ballontext2}>
                  너의 사진을 여기{'\n'} 뚝딱 넣어주고
                </Text>
              </View>
            </View>
          </ImageBackground>
        );
        break;
      case 4:
        mainScreenContent = (
          <ImageBackground
            source={require('../../assets/images/background/MainBackground.png')}
            style={styles.imageBackground}
          >
            <View style={styles.mainContainer}>
              <View style={styles.leftContainer}>
                <Pressable
                  onPress={handlePress}
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? .3 : 1,
                    },

                  ]}
                >
                  <Image source={mainPageCharacter} style={styles.ddak2} />
                  <Image
                    source={require('../../assets/images/Main/maincharacter.png')}
                    style={styles.greenButton}
                  />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('mybook')}>
                  <Image
                    source={require('../../assets/images/Main/books.png')}
                    style={styles.bookicon1}
                  />
                </Pressable>
              </View>

              <View style={styles.rightContainer}>
                <Pressable onPress={() => navigation.navigate('picture')}>
                  <Image
                    source={require('../../assets/images/Main/picture.png')}
                    style={styles.icon}
                  />
                </Pressable>
                <View style={styles.iconOverlay}>
                  <Pressable onPress={() => navigation.navigate('voice')}>
                    <Image
                      source={require('../../assets/images/Main/voice.png')}
                      style={styles.icon}
                    />
                  </Pressable>
                </View>
                <Pressable onPress={() => navigation.navigate('coloringList')}>
                  <Image
                    source={require('../../assets/images/Main/color.png')}
                    style={styles.icon}
                  />
                </Pressable>
              </View>

              <View style={styles.speechBubble}>
                <Image
                  source={require('../../assets/images/Main/ballon2.png')}
                  style={styles.ballon3}
                />
                <Text style={styles.ballontext3}>
                  여기서 너의 예쁘고,{'\n'} 멋있는 목소리를 들려줘
                </Text>
              </View>
            </View>
          </ImageBackground>
        );
        break;
      case 5:
        mainScreenContent = (
          <ImageBackground
            source={require('../../assets/images/background/MainBackground.png')}
            style={styles.imageBackground}
          >
            <View style={styles.mainContainer}>
              <View style={styles.leftContainer}>
                <View style={styles.iconOverlay}>
                  {/* <GreenButton
                  onPress={() => navigation.navigate('MainCharacterScreen')}
                  content="내가 주인공으로 갈 친구"
                  style={styles.greenButton}
                /> */}
                  <Pressable
                    onPress={handlePress}
                    style={({ pressed }) => [
                      {
                        opacity: pressed ? .3 : 1,
                      },

                    ]}
                  >
                    <Image
                      source={require('../../assets/images/Main/maincharacter.png')}
                      style={styles.greenButton}
                    />
                  </Pressable>
                </View>

                <Pressable onPress={() => navigation.navigate('mybook')}>
                  <Image
                    source={require('../../assets/images/Main/books.png')}
                    style={styles.bookicon2}
                  />
                </Pressable>
              </View>

              <View style={styles.rightContainer}>
                <Pressable onPress={() => navigation.navigate('picture')}>
                  <Image
                    source={require('../../assets/images/Main/picture.png')}
                    style={styles.icon}
                  />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('voice')}>
                  <Image
                    source={require('../../assets/images/Main/voice.png')}
                    style={styles.icon}
                  />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('coloringList')}>
                  <Image
                    source={require('../../assets/images/Main/color.png')}
                    style={styles.icon}
                  />
                </Pressable>
              </View>

              <View style={styles.speechBubble}>
                {userSex === 'M' ? (
                  <Image
                    source={require('../../assets/images/Main/뚝이gif2.gif')}
                    style={styles.ddaks}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/Main/딱이zip.gif')}
                    style={styles.ddaks}
                  />
                )}
                <Image
                  source={require('../../assets/images/Main/ballon3.png')}
                  style={styles.ballon4}
                />
                <Text style={styles.ballontext4}>
                  그럼{'\n'}
                  나와 함께{'\n'}
                  원하는 사진과{'\n'}
                  목소리를 골라서{'\n'}
                  너만의 동화를{'\n'}
                  만들 수 있어!
                </Text>
              </View>
            </View>
          </ImageBackground>
        );
        break;
      case 6:
        mainScreenContent = <MainScreen navigation={navigation} />;
        break;
      default:
        mainScreenContent = null;
        break;
    }
    return mainScreenContent;
  };

  return (
    <View style={{ flex: 1 }}>
      {YourComponent({ currentStep })}
      {currentStep > 1 && currentStep < 5 && (
        <Pressable
          onPress={handlePreviousStep}
          style={({ pressed}) => [
            styles.buttonWrapper, styles.backbutton,
            {
              opacity: pressed ? .3 : 1,
            }
          ]}
        >
          <Image source={require('../../assets/images/button/egun.png')} />
        </Pressable>
      )}
      {currentStep === 5 && (
        <Pressable
          onPress={handleNextStep}
          style={({ pressed}) => [
            styles.buttonWrapper, styles.backbutton,
            {
              opacity: pressed ? .3 : 1,
            }
          ]}
        >
          <Image source={require('../../assets/images/button/gotomake.png')} />
        </Pressable>
      )}
      {currentStep < 5 && (
        <Pressable
          onPress={handleNextStep}
          style={({ pressed}) => [
            styles.buttonWrapper, styles.backbutton,
            {
              opacity: pressed ? .3 : 1,
            }
          ]}
        >
          <Image source={require('../../assets/images/button/daum.png')} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  leftContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 20,
  },
  // 내가주인공 말풍선
  greenButton: { left: 300, top: 50 },
  icon: {
    width: 400,
    height: 130,
    margin: 40,
  },
  iconOverlay: {
    padding: 10,
    borderRadius: 10,
    zIndex: 11,
  },
  bookicon: {
    width: 710,
    height: 210,
    bottom: -20,
  },
  bookicon1: {
    width: 710,
    height: 210,
    bottom: -20,
    left: 5,
  },
  bookicon2: {
    width: 710,
    height: 210,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 20,
  },
  nextbutton: {
    right: 20,
  },
  backbutton: {
    left: 20,
  },
  speechBubble: {
    position: 'absolute',
    right: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
    width: '100%',
    height: '100%',
  },
  ballon: { left: '39%', top: '12%' },
  ballon2: { left: '20%', top: '3%' },
  ballon3: { left: '20%', top: '32%' },
  ballon4: { left: '59%', top: '12%' },
  ddak: {
    position: 'absolute',
    left: '3%',
    top: '20%',
    width: 455,
    height: 520,
  },
  ddaks: {
    position: 'absolute',
    left: '4%',
    top: '25%',
    width: 350,
    height: 380,
  },
  ddak2: {
    position: 'absolute',
    left: '3%',
    top: '31%',
    width: 350,
    height: 400,
    zIndex: 20,
  },
  ballontext: {
    position: 'absolute',
    fontFamily: 'im-hyemin-bold',
    fontSize: 70,
    left: '50%',
    top: '26%',
    textAlign: 'center',
  },
  ballontext2: {
    textAlign: 'center',
    position: 'absolute',
    fontFamily: 'im-hyemin-bold',
    fontSize: 40,
    left: '28%',
    top: '13%',
  },
  ballontext3: {
    textAlign: 'center',
    position: 'absolute',
    fontFamily: 'im-hyemin-bold',
    fontSize: 40,
    left: '24%',
    top: '43%',
  },
  ballontext4: {
    textAlign: 'center',
    position: 'absolute',
    fontFamily: 'im-hyemin-bold',
    fontSize: 45,
    left: '66%',
    top: '26%',
    flexDirection: 'column',
  },
});

export default Intro;
