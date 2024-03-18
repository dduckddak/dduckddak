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
  const RendingPages = () => {
    switch (currentStep) {
      case 1:
        return (
          <ImageBackground
            source={require('../assets/images/Rending.png')}
            style={styles.imageBackground}
          >
            <View>
              <Text style={{ fontSize: 40 }}> </Text>
              <View>
                <Animated.Image
                  source={require('../assets/images/뚝이.png')}
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
                  source={require('../assets/images/딱이.png')}
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
            source={require('../assets/images/Rending2.png')}
            style={styles.imageBackground}
          >
            <View>
              <Text style={{ fontSize: 40 }}></Text>
              <View>
                <Image source={require('../assets/images/뚝이2.png')} />
              </View>
            </View>
          </ImageBackground>
        );
      case 3:
        return (
          <ImageBackground
            source={require('../assets/images/Rending3.png')}
            style={styles.imageBackground}
          >
            <View>
              <Text style={{ fontSize: 40 }}></Text>
              <View>
                <Image source={require('../assets/images/뚝이2.png')} />
              </View>
            </View>
          </ImageBackground>
        );
      case 4:
        return (
          <ImageBackground
            source={require('../assets/images/Rending4.png')}
            style={styles.imageBackground}
          >
            <View>
              <Image source={require('../assets/images/뚝이2.png')} />
            </View>
          </ImageBackground>
        );
      case 5:
        return (
          <ImageBackground
            source={require('../assets/images/Rending5.png')}
            style={styles.imageBackground}
          >
            <View>
              <Image source={require('../assets/images/뚝이2.png')} />
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
          <Image source={require('../assets/images/back_button.png')} />
        </TouchableOpacity>
      )}
      {currentStep < 5 && (
        <TouchableOpacity
          onPress={handleNextStep}
          style={[styles.buttonWrapper, styles.nextbutton]}
        >
          <Image source={require('../assets/images/next_button.png')} />
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
});

export default MainRending;
