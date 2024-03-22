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
          <Button
            title="랜딩페이지"
            onPress={() => navigation.navigate('mainrending')}
          />
          <Button title="로그인" onPress={() => navigation.navigate('login')} />
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
          <Pressable onPress={() => navigation.navigate('voice')}>
            <Image
              source={require('../../assets/images/Main/voice.png')}
              style={styles.icon}
            />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('picture')}>
            <Image
              source={require('../../assets/images/Main/picture.png')}
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
});
