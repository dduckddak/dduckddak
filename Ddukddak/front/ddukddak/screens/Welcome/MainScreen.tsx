import React, { useState } from 'react';
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

interface MainScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const handleNextStep = () =>
    setCurrentStep((prevStep) => (prevStep < 6 ? prevStep + 1 : prevStep));
  const handlePreviousStep = () =>
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));

  let mainScreenContent = null;
  switch (currentStep) {
    case 1:
      mainScreenContent = (
        <ImageBackground
          source={require('../../assets/images/background/MainBackground.png')}
          style={styles.imageBackground}
        >
          <View style={styles.mainContainer}>
            <View style={styles.leftContainer}>
              <GreenButton
                onPress={() => navigation.navigate('MainCharacterScreen')}
                content="내가 주인공으로 갈 친구"
                style={styles.greenButton}
              />
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
                source={require('../../assets/images/DD/딱이.png')}
                style={styles.ddak}
              />
              <Image
                source={require('../../assets/images/Main/ballon.png')}
                style={styles.ballon}
              />
              <Text style={styles.ballontext}>
                안녕? 난 딱이야 뚝딱마을에 온걸 환영해!
              </Text>
            </View>
          </View>
        </ImageBackground>
      );
      break;
    case 2:
      mainScreenContent = (
        <View>
          <Text>case 2</Text>
        </View>
      );
      break;
    case 3:
      mainScreenContent = (
        <View>
          <Text>case 3</Text>
        </View>
      );
      break;
    case 4:
      mainScreenContent = (
        <View>
          <Text>case 4</Text>
        </View>
      );
      break;
    case 5:
      mainScreenContent = (
        <View>
          <Text>case 5</Text>
        </View>
      );
      break;
    case 6:
      mainScreenContent = (
        <ImageBackground
          source={require('../../assets/images/background/MainBackground.png')}
          style={styles.imageBackground}
        >
          <View style={styles.mainContainer}>
            {/* Left side content */}
            <View style={styles.leftContainer}>
              <Button
                title="랜딩페이지"
                onPress={() => navigation.navigate('mainrending')}
              />
              <Button
                title="로그인"
                onPress={() => navigation.navigate('login')}
              />
              <GreenButton
                onPress={() => navigation.navigate('MainCharacterScreen')}
                content="내가 주인공으로 갈 친구"
                style={styles.greenButton}
              />
              <Pressable onPress={() => navigation.navigate('mybook')}>
                <Image
                  source={require('../../assets/images/Main/books.png')}
                  style={styles.bookicon}
                />
              </Pressable>
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
      break;
    default:
      mainScreenContent = null;
      break;
  }

  return (
    <View style={{ flex: 1 }}>
      {mainScreenContent}

      {currentStep > 1 && currentStep < 6 && (
        <TouchableOpacity
          onPress={handlePreviousStep}
          style={[styles.buttonWrapper, styles.backbutton]}
        >
          <Image
            source={require('../../assets/images/button/back_button.png')}
          />
        </TouchableOpacity>
      )}
      {currentStep < 6 && (
        <TouchableOpacity
          onPress={handleNextStep}
          style={[styles.buttonWrapper, styles.nextbutton]}
        >
          <Image
            source={require('../../assets/images/button/next_button.png')}
          />
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
    justifyContent: 'flex-end',
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 20,
  },
  greenButton: {
    width: 300,
    height: 80,
  },
  icon: {
    width: 400,
    height: 130,
    margin: 40,
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
    right: 1, // Adjust as needed
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background color for speech bubble
    borderRadius: 10,
    zIndex: 10,
    width: '100%',
    height: '100%',
  },
  ballon: { left: '36%', top: '15%' },
  ddak: {
    position: 'absolute',
    left: '6%',
    top: '45%',
  },
  ballontext: {
    position: 'absolute',
    fontFamily: 'im-hyemin-bold',
    fontSize: 80,
    left: '46%',
    top: '34%',
    width: 550,
  },
});

export default MainScreen;
