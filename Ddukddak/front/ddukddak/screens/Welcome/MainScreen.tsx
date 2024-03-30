import React, { useEffect, useState } from 'react';
import {
  View,
  Pressable,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useUserStore } from '../../store/userStore';

interface MainScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

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
    inputRange: [0, 2],
    outputRange: [0, -20],
  });
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: screenHeight * 0.07,
        left: screenWidth * 0.04,
        width: screenWidth * 0.3,
        height: screenHeight * 0.1,
        transform: [{ translateY: cloud1TranslateY }],
      }}
    >
      {children}
    </Animated.View>
  );
};
const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  const userSex = useUserStore((state) => state.sex);
  const [mainPageCharacter, setMainPageCharacter] = useState();

  useEffect(() => {
    const updateMainImage = () => {
      if (userSex === 'M') {
        setMainPageCharacter(require('../../assets/images/DD/뚝이3.png'));
      } else {
        setMainPageCharacter(require('../../assets/images/DD/딱이.png'));
      }
    };

    updateMainImage();
  }, []);
  return (
    <ImageBackground
      source={require('../../assets/images/background/MainBackground.png')}
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
          style={styles.cloud2}
        />
      </CloudAnimation>
      <CloudAnimation>
        <Image
          source={require('../../assets/images/Main/cloud.png')}
          style={styles.cloud3}
        />
      </CloudAnimation>
      <View style={styles.mainContainer}>
        {/* Left side content */}
        <View style={styles.leftContainer}>
          <View style={{ zIndex: 999 }}>
            <Pressable
              onPress={() => navigation.navigate('MainCharacterScreen')}
            >
              <Image source={mainPageCharacter} style={styles.ddak2} />
              <Image
                source={require('../../assets/images/Main/maincharacter.png')}
                style={styles.greenButton}
              />
            </Pressable>
          </View>
          <View style={{ zIndex: 1 }}>
            <Pressable onPress={() => navigation.navigate('mybook')}>
              <Image
                source={require('../../assets/images/Main/books.png')}
                style={styles.bookicon}
              />
            </Pressable>
          </View>
        </View>
        {/* Right side content */}
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
      </View>
    </ImageBackground>
  );
};
export default MainScreen;
const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  cloud: {
    position: 'absolute',
    top: screenHeight * 0.01,
    left: screenWidth * 0.12,
  },
  cloud2: {
    position: 'absolute',
    top: screenHeight * 0.01,
    left: screenWidth * 0.45,
    width: screenWidth * 0.15,
    height: screenHeight * 0.2,
    transform: [{ scaleX: -1 }],
  },
  cloud3: {
    position: 'absolute',
    top: screenHeight * 0.2,
    left: screenWidth * 0.82,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  leftContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 20,
  },

  // 내가주인공 말풍선
  greenButton: { left: screenWidth * 0.26, top: screenHeight * 0.06 },
  icon: {
    width: screenWidth * 0.34,
    height: screenHeight * 0.17,
    margin: 40,
  },
  bookicon: {
    width: screenWidth * 0.585,
    height: screenHeight * 0.275,
  },
  ddak2: {
    position: 'absolute',
    left: screenWidth * 0.008,
    top: screenHeight * 0.2,
    width: screenWidth * 0.31,
    height: screenHeight * 0.53,
  },
});
