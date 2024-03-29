import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import GreenButton from '../../components/GreenButton';
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

  const handleNextStep = () =>
    setCurrentStep((prevStep) => (prevStep < 6 ? prevStep + 1 : prevStep));
  const handlePreviousStep = () =>
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));

  const handlePress = () => {
    navigation.navigate('MainCharacterScreen');
  };

  const dduk1 = require('../../assets/sound/dduk_1.mp3');
  const dduk2 = require('../../assets/sound/dduk_2.mp3');
  const ddak1 = require('../../assets/sound/ddak_1.mp3');
  const ddak2 = require('../../assets/sound/ddak_2.mp3');

  useEffect(() => {
    const setIntroCheck = async () => {
      await SecureStore.setItemAsync('introChecked', 'true');
    };

    setIntroCheck();

    const updateMainImage = () => {
      if (userSex === 'M') {
        setMainPageCharacter(require('../../assets/images/DD/뚝이.png'));
      } else {
        setMainPageCharacter(require('../../assets/images/DD/딱이.png'));
      }
    };

    const loadVoice = async (who : any) => {
      const voice = new Audio.Sound();
      setSoundObject(soundObject);
      try {
        console.log(who);
        await voice.loadAsync(who);
        await voice.playAsync();
      }catch (error) {
        console.error('Error loading voice: ', error);
      }
    }

    updateMainImage();

    if (currentStep === 1 && userSex === 'M') {
      loadVoice(dduk1).catch(console.error);
    }
    if(currentStep === 1 && userSex === 'F') {
      loadVoice(ddak1).catch(console.error);
    }
    if(currentStep === 2 && userSex === 'M') {
      loadVoice(dduk2).catch(console.error);
    }
    if(currentStep === 2 && userSex === 'F') {
      loadVoice(ddak2).catch(console.error);
    }

    return () => {
      if(soundObject) {
        soundObject.unloadAsync();
      }
    }
    
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
                <TouchableOpacity onPress={handlePress}>
                  <Image
                    source={require('../../assets/images/Main/maincharacter.png')}
                    style={styles.greenButton}
                  />
                </TouchableOpacity>
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
                {selectedId === 1 ? (
                  <Image
                    source={require('../../assets/images/Main/뚝이zip.gif')}
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
                  안녕? {'\n'}난 딱이야!{'\n'}
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
                <TouchableOpacity onPress={handlePress}>
                  <Image
                    source={require('../../assets/images/Main/maincharacter.png')}
                    style={styles.greenButton}
                  />
                </TouchableOpacity>
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
                <Image
                  source={require('../../assets/images/Main/딱이zip.gif')}
                  style={styles.ddak}
                />
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
                <TouchableOpacity onPress={handlePress}>
                  <Image
                    source={mainPageCharacter}
                    style={styles.ddak2}
                  />
                  <Image
                    source={require('../../assets/images/Main/maincharacter.png')}
                    style={styles.greenButton}
                  />
                </TouchableOpacity>
                <Pressable onPress={() => navigation.navigate('mybook')}>
                  <Image
                    source={require('../../assets/images/Main/books.png')}
                    style={styles.bookicon}
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
                <TouchableOpacity onPress={handlePress}>
                  <Image
                    source={mainPageCharacter}
                    style={styles.ddak2}
                  />
                  <Image
                    source={require('../../assets/images/Main/maincharacter.png')}
                    style={styles.greenButton}
                  />
                </TouchableOpacity>
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
                  <TouchableOpacity onPress={handlePress}>
                    <Image
                      source={require('../../assets/images/Main/maincharacter.png')}
                      style={styles.greenButton}
                    />
                  </TouchableOpacity>
                </View>

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
                <Image
                  source={require('../../assets/images/Main/딱이zip.gif')}
                  style={styles.ddak}
                />
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
      {currentStep > 1 && currentStep < 6 && (
        <TouchableOpacity
          onPress={handlePreviousStep}
          style={[styles.buttonWrapper, styles.backbutton]}
        >
          <Image source={require('../../assets/images/button/egun.png')} />
        </TouchableOpacity>
      )}
      {currentStep < 6 && (
        <TouchableOpacity
          onPress={handleNextStep}
          style={[styles.buttonWrapper, styles.nextbutton]}
        >
          <Image source={require('../../assets/images/button/daum.png')} />
        </TouchableOpacity>
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
    left: '6%',
    top: '20%',
    width: 400,
    height: 550,
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
    fontSize: 40,
    left: '68%',
    top: '29%',
    flexDirection: 'column',
  },
});

export default Intro;
