import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground, Image, FlatList, ImageSourcePropType, TouchableOpacity,
} from 'react-native';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import GreenButton from '../../components/GreenButton';
import { Dimensions } from 'react-native';
import { getColoringBases } from '../../api/coloringApi';

interface ColoringScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

interface Item {
  item: string;
}

const ColoringScreen: React.FC<ColoringScreenProps> = ({
                                                         navigation,
                                                       }) => {

  const [coloringBaseList, setColoringBaseList] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);


  useEffect(() => {
    const handleColoringScreenEnter = async () => {
      const response = await getColoringBases();
      if (response.coloringBaseList) {
        setColoringBaseList(response.coloringBaseList);
      }
      console.log(response);
    };

    handleColoringScreenEnter();
  }, []);

  useEffect(() => {
    console.log(selectedImage);
  }, [selectedImage]);


  const handleNavigateDrawing = () => {
    if (!selectedImage) {
      console.log('선택된 것 없음');
      return;
    }

    navigation.navigate('coloringDraw', { uri: selectedImage });

  };

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.imageContainer}>
      <TouchableOpacity onPress={() => setSelectedImage(item)}>
        <Image source={{ uri: item }} style={[styles.image, selectedImage === item ? styles.selectedImage : null]} />
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/background/background.png')}
      style={styles.imageBackground}
    >
      <View style={styles.flexContainer}>

        <View
          style={styles.box}
        >
          <FlatList
            style={styles.flatList}
            data={coloringBaseList}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4}
            contentContainerStyle={styles.flatListContentContainer}
          />
        </View>

        <GreenButton
          onPress={handleNavigateDrawing}
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
    backgroundColor: 'rgba(205, 234, 185, 0.48)',
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
  selectedImage: {
    borderWidth: 3,
    borderColor: 'rgba(180, 130, 210, 0.5)',
  },
});

export default ColoringScreen;
