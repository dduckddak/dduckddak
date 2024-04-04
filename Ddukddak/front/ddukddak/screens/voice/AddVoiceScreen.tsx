import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import GreenButton from '../../components/GreenButton';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../../store/userStore';
import { Audio } from 'expo-av';
import { useBgmStore } from '../../store/BgmStore';

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

function AddVoiceScreen() {
  const userSex = useUserStore((state) => state.sex);
  const [character, setCharacter] = useState();
  const [sound, setSound] = useState<Audio.Sound>();
  const navigation = useNavigation();

  const { bgmSound, isPlaying } = useBgmStore();

  useEffect(() => {
    if (bgmSound) {
      bgmSound.pauseAsync();
    }

    return () => {
      if (isPlaying) {
        bgmSound?.playAsync();
      }
    };
  }, []);

  useEffect(() => {
    const soundObject = new Audio.Sound();
    setSound(soundObject);

    const updateMainImage = () => {
      if (userSex === 'M') {
        setCharacter(require('../../assets/images/Main/뚝이zip.gif'));
      } else {
        setCharacter(require('../../assets/images/Main/딱이zip3.gif'));
      }
    };

    const playAudio = async () => {
      if (userSex == 'M')
        await soundObject.loadAsync(
          require('../../assets/sound/add_voice_dduk.mp3'),
        );

      if (userSex == 'F')
        await soundObject.loadAsync(
          require('../../assets/sound/add_voice_ddak.mp3'),
        );

      await soundObject.playAsync();
    };

    updateMainImage();
    playAudio();

    return () => {
      soundObject?.unloadAsync();
    };
  }, []);
  return (
    <ImageBackground
      source={require('../../assets/images/background/morning.jpg')}
      style={styles.ImageBackground}
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
      <View style={styles.container}>
        {character && <Image source={character} style={styles.dd} />}

        <Image
          source={require('../../assets/images/Main/ballon.png')}
          style={styles.ballon}
        ></Image>
        <View style={styles.ballontext}>
          <Text style={styles.text}>목소리를 추가하고 싶구나 !</Text>
          <Text style={styles.text}>
            목소리를 추가하기 위해서{'\n'}
            대사 조금만{'\n'}
            읽어줄 수 있을까?
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <GreenButton
          content="녹음하러가기"
          onPress={() => {
            sound?.unloadAsync();
            navigation.navigate('record' as never);
          }}
          style={styles.buttonStyle}
        />
      </View>
    </ImageBackground>
  );
}

export default AddVoiceScreen;

const styles = StyleSheet.create({
  ImageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  cloud: {
    position: 'absolute',
    top: 5,
    left: 240,
    transform: [{ scaleX: -1 }],
  },
  cloud2: {
    position: 'absolute',
    top: 85,
    left: 350,
    width: 200,
    height: 130,
  },
  cloud3: {
    position: 'absolute',
    top: 55,
    left: 1050,
    width: 150,
    height: 120,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dd: {
    position: 'absolute',
    left: 20,
    width: 500,
    height: 450,
    bottom: -320,
  },
  ballon: {
    position: 'absolute',
    top: 50,
    right: 70,
    width: 650,
    height: 500,
  },
  ballontext: {
    position: 'absolute',
    right: 120,
    top: 205,
    zIndex: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 47,
    fontFamily: 'im-hyemin-bold',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 50,
  },
  buttonStyle: {
    width: '20%',
    bottom: -10,
  },
});
