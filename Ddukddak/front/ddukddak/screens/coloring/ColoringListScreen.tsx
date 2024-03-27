import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground, Image, FlatList, ImageSourcePropType,
} from 'react-native';

import { NavigationProp, ParamListBase, useFocusEffect } from '@react-navigation/native';
import GreenButton from '../../components/GreenButton';
import { Dimensions } from 'react-native';
import SketchbookList from './sketchbook/SketchbookList';
import { getColorings } from '../../api/coloringApi';

interface ColoringListScreenProps {
  navigation: NavigationProp<ParamListBase>;
}


const ColoringListScreen: React.FC<ColoringListScreenProps> = ({
                                                                 navigation,
                                                               }) => {
  const [coloringList, setColoringList] = useState<{ coloringId: number, coloringFile: string }[]>([]);


  useFocusEffect(
    useCallback(() => {
      const handleColoringListEnter = async () => {
        const coloringResponse = await getColorings();
        if (coloringResponse.coloringList) {
          setColoringList(coloringResponse.coloringList);
        }
      };

      handleColoringListEnter();
    }, []),
  );


  return (
    <ImageBackground
      source={require('../../assets/images/background/background.png')}
      style={styles.imageBackground}
    >

      <SketchbookList images={coloringList} navigation={navigation}>
      </SketchbookList>

    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

});

export default ColoringListScreen;
