import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground, Image, FlatList, ImageSourcePropType,
} from 'react-native';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import GreenButton from '../../components/GreenButton';
import { Dimensions } from 'react-native';
import SketchbookList from '../../components/SketchbookList';

interface ColoringListScreenProps {
  navigation: NavigationProp<ParamListBase>;
}


const images = [{
  source: require('../../assets/images/splash.png'),
  id: '1',
  },
  {
    source: require('../../assets/images/splash.png'),
    id: '2',
  },
  {
    source: require('../../assets/images/splash.png'),
    id: '3',
  },
  {
    source: require('../../assets/images/splash.png'),
    id: '4',
  },
  {
    source: require('../../assets/images/splash.png'),
    id: '5',
  },
  {
    source: require('../../assets/images/splash.png'),
    id: '6',
  },
  {
    source: require('../../assets/images/splash.png'),
    id: '7',
  },
  {
    source: require('../../assets/images/splash.png'),
    id: '8',
  },
  {
    source: require('../../assets/images/splash.png'),
    id: '9',
  },
];

interface Item {
  item: ImageSourcePropType;
}

const ColoringListScreen: React.FC<ColoringListScreenProps> = ({
                                                                 navigation,
                                                               }) => {


  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.imageBackground}
    >

      <SketchbookList images={images}>
      </SketchbookList>




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

});

export default ColoringListScreen;
