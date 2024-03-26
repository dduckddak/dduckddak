import React from 'react';
import {
  View,
  Text,
  Pressable,
  Button,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import GreenButton from '../../components/GreenButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface MainScreenProps {
  navigation: NavigationProp<ParamListBase>;
}
const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/background/MainBackground.png')}
      style={styles.imageBackground}
    >
      <View style={styles.mainContainer}>
        {/* Left side content */}
        <View style={styles.leftContainer}>
          <Pressable onPress={() => navigation.navigate('MainCharacterScreen')}>
            <Image
              source={require('../../assets/images/DD/딱이.png')}
              style={styles.ddak2}
            />
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
  greenButton: { left: 300, top: 40 },
  icon: {
    width: 400,
    height: 130,
    margin: 40,
  },
  bookicon: {
    width: 710,
    height: 210,
  },
  ddak2: {
    position: 'absolute',
    left: '3%',
    top: '31%',
    width: 350,
    height: 400,
    zIndex: 20,
  },
});
