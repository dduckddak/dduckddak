import React, { useCallback, useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from '@react-navigation/native';
import SketchbookList from './sketchbook/SketchbookList';
import { getColorings } from '../../api/coloringApi';

interface ColoringListScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const ColoringListScreen: React.FC<ColoringListScreenProps> = ({
  navigation,
}) => {
  const [coloringList, setColoringList] = useState<
    { coloringId: number; coloringFile: string }[]
  >([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      const handleColoringListEnter = async () => {
        const coloringResponse = await getColorings();
        if (coloringResponse.coloringList) {
          setColoringList(coloringResponse.coloringList);
        }
        setIsLoading(false);
      };

      handleColoringListEnter();
    }, []),
  );

  return (
    <ImageBackground
      source={require('../../assets/images/background/MainBackground.png')}
      style={styles.imageBackground}
    >
      <SketchbookList
        isLoading={isLoading}
        images={coloringList}
        navigation={navigation}
      ></SketchbookList>
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
