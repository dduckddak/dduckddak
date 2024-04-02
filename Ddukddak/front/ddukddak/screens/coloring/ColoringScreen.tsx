import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  Text,
  Animated, Pressable,
} from 'react-native';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import GreenButton from '../../components/GreenButton';
import { Dimensions } from 'react-native';
import { getColoringBases } from '../../api/coloringApi';
import AlertModal from '../../components/AlertModal';

interface ColoringScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

interface Item {
  item: string;
}
const CloudAnimation = ({ children }: { children: React.ReactNode }) => {
  const [cloudAnimationValue] = useState(new Animated.Value(0));

  useEffect(() => {
    const animateClouds = () => {
      const cloudAnimation = Animated.sequence([
        Animated.timing(cloudAnimationValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(cloudAnimationValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]);

      Animated.loop(cloudAnimation).start();
    };
    animateClouds();
    return () => {};
  }, [cloudAnimationValue]);
  const cloud1TranslateY = cloudAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, -40],
  });
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 45,
        left: 50,
        width: 200,
        height: 130,
        transform: [{ translateY: cloud1TranslateY }],
      }}
    >
      {children}
    </Animated.View>
  );
};
const ColoringScreen: React.FC<ColoringScreenProps> = ({ navigation }) => {
  const [coloringBaseList, setColoringBaseList] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const handleColoringScreenEnter = async () => {
      const response = await getColoringBases();
      if (response.coloringBaseList) {
        setColoringBaseList(response.coloringBaseList);
      }
    };

    handleColoringScreenEnter();
  }, []);

  const handleNavigateDrawing = () => {
    if (!selectedImage) {
      // TODO 예외처리 필요
      console.log('선택된 것 없음');
      setIsModalVisible(true);
      return;
    }

    navigation.navigate('coloringDraw', { uri: selectedImage });
  };

  const handleImageSelect = (item: string) => {
    setSelectedImage((prevSelectedImage) =>
      prevSelectedImage === item ? null : item,
    );
  };

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.imageContainer}>
      <Pressable
        onPress={() => handleImageSelect(item)}
        style={({ pressed }) => [
          {
            opacity: pressed ? .3 : 1,
          },

        ]}
      >
        <Image
          source={{ uri: item }}
          style={[
            styles.image,
            selectedImage === item ? styles.selectedImage : null,
          ]}
        />
      </Pressable>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/background/MainBackground.png')}
      style={styles.imageBackground}
    >
      <CloudAnimation>
        <Image
          source={require('../../assets/images/Main/cloud.png')}
          style={styles.cloud}
        />
      </CloudAnimation>
      <CloudAnimation>
        <Image
          source={require('../../assets/images/Main/cloud.png')}
          style={styles.cloud1}
        />
      </CloudAnimation>
      <CloudAnimation>
        <Image
          source={require('../../assets/images/Main/cloud.png')}
          style={styles.cloud2}
        />
      </CloudAnimation>
      <CloudAnimation>
        <Image
          source={require('../../assets/images/Main/cloud.png')}
          style={styles.cloud3}
        />
      </CloudAnimation>
      <View style={styles.flexContainer}>
        <Text style={styles.textStyle}>🎨 그림을 골라줘 🎨</Text>
        <View style={styles.box}>
          <FlatList
            style={styles.flatList}
            data={coloringBaseList}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            contentContainerStyle={styles.flatListContentContainer}
          />
        </View>

        <GreenButton
          onPress={handleNavigateDrawing}
          content="선택한그림 색칠"
          style={styles.naviBtn}
        />
        <AlertModal
          isVisible={isModalVisible}
          text={['그림을 선택해주세요.']}
          onConfirm={() => setIsModalVisible(false)}
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
  },
  cloud: { position: 'absolute', top: 5, left: 200 },
  cloud1: { position: 'absolute', top: 25, left: 400, width: 200, height: 130 },
  cloud2: {
    position: 'absolute',
    top: 5,
    left: 690,
    width: 150,
    height: 110,
    transform: [{ scaleX: -1 }],
  },
  cloud3: { position: 'absolute', top: 35, left: 1050 },
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: 'rgba(205, 234, 185, 0.48)',
    height: 550,
    width: 1100,
    paddingVertical: 20,
    marginTop: 5,
    padding: '2%',
    borderRadius: 15,
  },
  naviBtn: {
    width: 250,
    marginTop: 5,
  },

  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: 15,
  },

  image: {
    width: 505,
    height: 420,
    resizeMode: 'cover',
    alignSelf: 'center',
    backgroundColor: 'white',
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
    borderWidth: 8,
    borderRadius: 10,
    borderColor: 'rgba(180, 130, 210, 0.5)',
  },
  textStyle: {
    fontFamily: 'im-hyemin-bold',
    fontSize: 48,
    marginTop: 30,
  },
});

export default ColoringScreen;
