import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground, Image, FlatList, ImageSourcePropType,
} from 'react-native';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import GreenButton from '../../components/GreenButton';
import { Dimensions } from 'react-native';
import SketchbookList from './sketchbook/SketchbookList';
import { getColorings } from '../../api/coloringApi';

interface ColoringListScreenProps {
  navigation: NavigationProp<ParamListBase>;
}


const images = [{
  source: require('../../assets/images/coloring/yes_0.jpg'),
  id: '1',
  },
  {
    source: require('../../assets/images/coloring/yes_7.jpg'),
    id: '2',
  },
  {
    source: require('../../assets/images/coloring/yes_13.jpg'),
    id: '3',
  },
  {
    source: require('../../assets/images/coloring/yes_14.jpg'),
    id: '4',
  },
  {
    source: require('../../assets/images/coloring/yes_18.jpg'),
    id: '5',
  },
  {
    source: require('../../assets/images/coloring/yes_20.jpg'),
    id: '6',
  },
  {
    source: require('../../assets/images/coloring/yes_2.jpg'),
    id: '7',
  },
  {
    source: require('../../assets/images/coloring/yes_7.jpg'),
    id: '8',
  },
  {
    source: require('../../assets/images/coloring/yes_17.jpg'),
    id: '9',
  },
];


const ColoringListScreen: React.FC<ColoringListScreenProps> = ({
                                                                 navigation,
                                                               }) => {
  const [coloringList, setColoringList] = useState<{coloringId: number, coloringFile: string}[]>([]);


  useEffect(() => {
    const handleColoringListEnter = async () => {
      const coloringResponse = await getColorings()
      if (coloringResponse.coloringList) {
        setColoringList(coloringResponse.coloringList);
        console.log(coloringResponse.coloringList);
      }
    }

    handleColoringListEnter();
  }, []);

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
