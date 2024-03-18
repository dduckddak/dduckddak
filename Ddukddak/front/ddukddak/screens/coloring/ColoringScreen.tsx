import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground, Image, FlatList, ImageSourcePropType,
} from 'react-native';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import GreenButton from '../../components/GreenButton';
import { Dimensions } from 'react-native';

interface ColoringScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

interface Item {
  item: ImageSourcePropType;
}

const images = new Array(12).fill(require('../../assets/images/splash.png'));

const ColoringScreen: React.FC<ColoringScreenProps> = ({
                                                         navigation,
                                                       }) => {

  const renderItem = ({ item }: Item) => (
    <View style={styles.imageContainer}>
      <Image source={item} style={styles.image} />
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.imageBackground}
    >
      <View style={styles.flexContainer}>

        <View
          style={styles.box}
        >
          <FlatList
            style={styles.flatList}
            data={images}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4}
            contentContainerStyle={styles.flatListContentContainer}
          />
        </View>

        <GreenButton
          onPress={() => navigation.navigate('coloringDraw')}
          content="색칠하러 가기"
          style={styles.naviBtn}
        />
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  }
  ,
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  }
  ,
  box: {
    backgroundColor: 'rgba(205, 234, 185, 0.48)', // CDEAB9의 RGB 값은 205, 234, 185입니다.
    height:
      Dimensions.get('screen').height * 0.6,
    width:
      Dimensions.get('screen').width * 0.85,
    paddingVertical: 20,
  }
  ,
  naviBtn: {
    width: Dimensions.get('screen').width * 0.15,
    marginTop:
      Dimensions.get('screen').height * 0.04,
  },

  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: 15,
  },

  image: {
    width: Dimensions.get('screen').width / 6,
    height: Dimensions.get('screen').width / 6,
    resizeMode: 'cover',
    alignSelf: 'center',

  },
  flatListContentContainer: {
    justifyContent: 'center',
    flexGrow: 1,


  },
  flatList: {
    width: '100%',
    height: '100%',
  },
});

export default ColoringScreen;
