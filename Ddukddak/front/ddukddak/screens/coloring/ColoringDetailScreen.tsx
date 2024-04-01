import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  ImageSourcePropType,
  Dimensions,
} from 'react-native';

import { NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import SketchbookDetail from './sketchbook/SketchbookDetail';

type SketchImage = {
  coloringFile: string;
  coloringId: number;
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
      source={require('../../assets/images/background/MainBackground.png')}
      style={styles.imageBackground}
    >
      <SketchbookDetail navigation={navigation} image={image} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  naviBtn: {
    width: 200,
    marginTop: 0,
  },
});

export default ColoringDetailScreen;
