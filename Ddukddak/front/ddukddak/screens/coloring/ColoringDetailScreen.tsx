import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground, Image, FlatList, ImageSourcePropType, Dimensions,
} from 'react-native';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import SketchbookDetail from '../../components/SketchbookDetail';
import GreenButton from '../../components/GreenButton';


interface ColoringDetailScreenProps {
  navigation: NavigationProp<ParamListBase>;
}


const image = {
  source: require('../../assets/images/splash.png'),
  id: '1',
};


const ColoringDetailScreen: React.FC<ColoringDetailScreenProps> = ({
                                                                     navigation,
                                                                   }) => {

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.imageBackground}
    >

      <SketchbookDetail image={image} />

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

  },
  naviBtn: {
    width: Dimensions.get('screen').width * 0.15,
    marginTop:
      Dimensions.get('screen').height * 0.04,
  },

});

export default ColoringDetailScreen;
