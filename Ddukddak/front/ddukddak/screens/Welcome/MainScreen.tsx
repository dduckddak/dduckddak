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
      source={require('../../assets/images/MainBackground.png')}
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
              source={require('../../assets/images/mybook.png')}
              style={styles.bookicon}
            />
          </Pressable>
        </View>

        {/* Right side content */}
        <View style={styles.rightContainer}>
          <Pressable onPress={() => navigation.navigate('picture')}>
            <Image
              source={require('../../assets/images/picture.png')}
              style={styles.icon}
            />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('voice')}>
            <Image
              source={require('../../assets/images/voice.png')}
              style={styles.icon}
            />
          </Pressable>
          <Button
            title="색칠뚝딱"
            onPress={() => navigation.navigate('coloringList')}
          />
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
    alignItems: 'center',
  },
  leftContainer: {
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  rightContainer: {
    alignItems: 'flex-end',
    marginRight: 20,
  },
  greenButton: {
    width: 300,
    height: 80,
  },
  icon: {
    width: 245,
    height: 100,
    margin: 10,
  },
  bookicon: {
    width: 400,
    height: 130,
    margin: 10,
  },
});
