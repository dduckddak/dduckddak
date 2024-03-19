import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';

const MainRending: React.FC = () => {
  const navigation = useNavigation();

  const handleNextPress = () => {
    navigation.navigate('mainrending' as never);
  };
  return (
    <ImageBackground
      source={require('../../assets/images/Rending2.png')}
      style={styles.imageBackground}
    >
      <View>
        <Text style={{ fontSize: 40 }}></Text>
        <View>
          <Image
            source={require('../../assets/images/button/back_button.png')}
            style={styles.backbutton}
          />
          <TouchableOpacity onPress={handleNextPress}>
            <Image
              source={require('../../assets/images/button/next_button.png')}
              style={styles.nextbutton}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Image source={require('../../assets/images/DD/뚝이2.png')} />
        </View>
      </View>
    </ImageBackground>
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
    marginTop: -250,
    marginLeft: '67%',
  },
  backbutton: {
    position: 'absolute',
    top: '190%',
  },
  nextbutton: {
    alignSelf: 'flex-end',
    position: 'absolute',
  },
});

export default MainRending;
