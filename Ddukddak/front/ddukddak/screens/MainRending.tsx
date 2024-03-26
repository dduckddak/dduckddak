import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  Button,
} from 'react-native';
import GreenButton from '../components/GreenButton';

const MainRending: React.FC = () => {
  const dduckAnimation = useRef(new Animated.Value(0)).current;
  const ddakAnimation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const handleNextStep = () =>
    setCurrentStep((prevStep) => (prevStep < 5 ? prevStep + 1 : prevStep));
  const handlePreviousStep = () =>
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  useEffect(() => {
    const startAnimations = () => {
      const dduckShake = Animated.loop(
        Animated.sequence([
          Animated.timing(dduckAnimation, {
            toValue: -20,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dduckAnimation, {
            toValue: 20,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(dduckAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      );

      const ddakShake = Animated.loop(
        Animated.sequence([
          Animated.timing(ddakAnimation, {
            toValue: 20,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(ddakAnimation, {
            toValue: -20,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(ddakAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      );

      dduckShake.start();
      ddakShake.start();

      return () => {
        dduckShake.stop();
        ddakShake.stop();
      };
    };

    return startAnimations();
  }, [currentStep]);

  const SkipToPage5 = () => {
    setCurrentStep(5);
  };

  const RendingPages = () => {
    switch (currentStep) {
      case 1:
        return (
          <ImageBackground
            source={require('../assets/images/Rendering/Rending.png')}
            style={styles.imageBackground}
          >
            <TouchableOpacity onPress={SkipToPage5} style={styles.skipButton}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            <View>
              <Text style={{ fontSize: 40 }}> </Text>
              <View>
                <Animated.Image
                  source={require('../assets/images/DD/뚝이.png')}
                  style={[
                    styles.dduck,
                    {
                      transform: [
                        {
                          rotateZ: dduckAnimation.interpolate({
                            inputRange: [-20, 20],
                            outputRange: ['-20deg', '20deg'],
                          }),
                        },
                      ],
                    },
                  ]}
                />
              </View>
              <View>
                <Animated.Image
                  source={require('../assets/images/DD/딱이.png')}
                  style={[
                    styles.ddak,
                    {
                      transform: [
                        {
                          rotateZ: ddakAnimation.interpolate({
                            inputRange: [-20, 20],
                            outputRange: ['20deg', '-20deg'],
                          }),
                        },
                      ],
                    },
                  ]}
                />
              </View>
            </View>
          </ImageBackground>
        );
      case 2:
        return (
          <ImageBackground
            source={require('../assets/images/Rendering/Rending2.png')}
            style={styles.imageBackground}
          >
            <View>
              <Text style={{ fontSize: 40 }}></Text>
              <View>
                <View style={styles.box}>
                  <Image
                    source={require('../assets/images/Rendering/이미지.png')}
                    style={styles.centeredImage}
                  />
                </View>
                <Image
                  source={require('../assets/images/DD/뚝이2.png')}
                  style={styles.rendingtwo}
                />
              </View>
            </View>
          </ImageBackground>
        );
      case 3:
        return (
          <ImageBackground
            source={require('../assets/images/Rendering/Rending3.png')}
            style={styles.imageBackground}
          >
            <View>
              <Text style={{ fontSize: 40 }}></Text>
              <View>
                <View style={styles.box}>
                  <Image
                    source={require('../assets/images/Rendering/이미지3.png')}
                    style={styles.centeredImage1}
                  />
                </View>
                <Image
                  source={require('../assets/images/DD/뚝이2.png')}
                  style={styles.rendingthree}
                />
              </View>
            </View>
          </ImageBackground>
        );
      case 4:
        return (
          <ImageBackground
            source={require('../assets/images/Rendering/Rending4.png')}
            style={styles.imageBackground}
          >
            <View>
              <View style={styles.box}>
                <Image
                  source={require('../assets/images/Rendering/이미지4.png')}
                  style={styles.centeredImage2}
                />
              </View>
              <Image
                source={require('../assets/images/DD/뚝이2.png')}
                style={styles.rendingfour}
              />
            </View>
          </ImageBackground>
        );
      case 5:
        return (
          <ImageBackground
            source={require('../assets/images/Rendering/Rending5.png')}
            style={styles.imageBackground}
          >
            <View>
              <Image source={require('../assets/images/DD/뚝이2.png')} />
            </View>
            <View style={styles.buttonStyle}>
              <GreenButton
                content="로그인"
                onPress={() => {
                  navigation.navigate('login' as never);
                }}
                style={{ width: 160 }}
              />
            </View>
          </ImageBackground>
        );
      default:
        return <View />;
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {RendingPages()}

      {currentStep > 1 && (
        <TouchableOpacity
          onPress={handlePreviousStep}
          style={[styles.buttonWrapper, styles.backbutton]}
        >
          <Image source={require('../assets/images/button/back_button.png')} />
        </TouchableOpacity>
      )}
      {currentStep < 5 && (
        <TouchableOpacity
          onPress={handleNextStep}
          style={[styles.buttonWrapper, styles.nextbutton]}
        >
          <Image source={require('../assets/images/button/next_button.png')} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    padding: 30,
  },
  dduck: {
    marginTop: 120,
    marginLeft: 70,
  },
  ddak: {
    marginTop: -230,
    marginLeft: '67%',
  },
  nextbutton: {
    alignSelf: 'flex-end',
    bottom: 300,
    right: 10,
  },
  backbutton: {
    top: 340,
    left: 10,
  },
  buttonWrapper: {
    position: 'absolute',
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 새로운 이미지 스타일 추가
  centeredImage: {
    marginTop: '70%',
    width: '100%',
    height: 350,
    resizeMode: 'contain',
  },
  centeredImage1: {
    marginTop: '25%',
    width: '100%',
    height: 350,
    resizeMode: 'contain',
  },
  centeredImage2: {
    marginTop: '80%',
    width: '100%',
    height: 350,
    resizeMode: 'contain',
  },
  rendingtwo: {
    marginTop: '24%',
    transform: [{ rotateZ: '-10deg' }],
    marginLeft: '5%',
  },
  rendingthree: {
    marginTop: '4%',
    marginLeft: '5%',
  },
  rendingfour: {
    marginTop: '31%',
    transform: [
      { scaleX: -1 }, // 좌우 반전
      { rotateZ: '-10deg' },
    ],
    marginLeft: '69%',
  },
  skipButton: {
    position: 'absolute',
    top: '97%',
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 13,
    borderRadius: 5,
    width: 120,
    height: 60,
    alignItems: 'center',
  },
  skipText: {
    fontFamily: 'im-hyemin-bold',
    color: 'white', // 버튼 텍스트의 색상
    fontSize: 25, // 버튼 텍스트의 크기
  },
  buttonStyle: {
    position: 'absolute', // 절대 위치 사용
    bottom: 40, // 하단에서부터의 거리
    alignSelf: 'center',
  },
});

export default MainRending;
