import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground, FlatList, ImageSourcePropType, Dimensions,
} from 'react-native';

import { NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import SketchbookDetail from '../../components/SketchbookDetail';



type SketchImage = {
  source: ImageSourcePropType;
  id: string;
};

type ParamListBase = {
  coloringDetail: SketchImage;
};

interface ColoringDetailScreenProps {
  navigation: NavigationProp<ParamListBase>;
}


const ColoringDetailScreen: React.FC<ColoringDetailScreenProps> = ({
                                                                     navigation,
                                                                   }) => {
  const route = useRoute<RouteProp<ParamListBase, 'coloringDetail'>>();
  const image = route.params;

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
