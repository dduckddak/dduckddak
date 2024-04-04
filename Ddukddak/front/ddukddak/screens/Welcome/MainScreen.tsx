import React, { useEffect, useState } from 'react';
import {
  View,
  Pressable,
  Image,
  ImageBackground,
  StyleSheet,
  Animated,
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useUserStore } from '../../store/userStore';

interface MainScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

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
              style={styles.pressableContainer}
            >
              {mainPageCharacter && (
                <Image
                  source={mainPageCharacter}
                  style={styles.characterImage}
                />
              )}
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

  cloud: { position: 'absolute', top: 5, left: 120 },
  cloud2: {
    position: 'absolute',
    top: 15,
    left: 570,
    width: 160,
    height: 130,
    transform: [{ scaleX: -1 }],
  },
  cloud3: {
    position: 'absolute',
    top: 155,
    left: 900,
    width: 150,
    height: 120,
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
    marginTop: 60,
    marginRight: 20,
  },

  pressableContainer: {
    position: 'absolute',
    left: -5,
    top: -330,
    width: 650,
    height: 380,
    paddingRight: 240,
  },
  characterImage: {
    width: '100%', // Pressable 내부에서 전체 크기를 차지하도록
    height: '100%', // Pressable 내부에서 전체 크기를 차지하도록
    resizeMode: 'contain',

    // 이미지가 비율을 유지하며 전체 공간을 차지하도록
  },
  // 내가주인공 말풍선
  greenButton: {
    position: 'absolute',
    bottom: 40,
    left: 300,
    width: 450,
    height: 450,
    resizeMode: 'contain',
  },
  icon: {
    width: 360,
    height: 120,
    margin: 40,
  },
  bookicon: {
    width: 710,
    height: 210,
    right: 22,
    top: 5,
  },
  ddak2: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
