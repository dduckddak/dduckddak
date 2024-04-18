import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  Image,
  Dimensions,
  Alert,
  Animated,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import GreenButton from '../../components/GreenButton';
import ImagePickerComponent from '../../components/picture/ImagePicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getPhotos, deletePhotos } from '../../api/photoApi';
import EmptyListComponent from '../../components/EmptyListComponent';
import useTouchEffect from '../../components/sound/TouchEffect';

const { width } = Dimensions.get('screen');

// 구름 두둥실
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
    outputRange: [0, -20],
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

function PictureScreen() {
  const [imageData, setImageData] = useState<
    { uri: string; selected: boolean; id: number }[]
  >([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { playTouch } = useTouchEffect();

  // 오리야 놀아라
  const duckPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(duckPosition, {
          toValue: { x: width * 0.1, y: 0 },
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(duckPosition, {
          toValue: { x: 2, y: 0 },
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);
  // 추가 끝

  const readPhotos = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getPhotos();
      if (response.photoList) {
        setImageData(
          response.photoList.map((photo, index) => ({
            uri: photo.photoFile,
            selected: false,
            id: photo.photoId,
          })),
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('사진 목록을 불러오는데 실패했습니다.', error.message);
      } else {
        console.log('알 수 없는 에러', error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      readPhotos();
    }, [readPhotos]),
  );

  // 이미지 선택 로직
  const toggleImageSelected = (index: number) => {
    // 삭제 모드일 때만 선택 가능
    if (deleteMode) {
      setImageData((images) =>
        images.map((img, i) => {
          if (i === index) {
            const updatedSelected = !img.selected;
            // 선택된 이미지 배열 업데이트
            if (updatedSelected) {
              setSelectedImages((prevSelectedImages) => [
                ...prevSelectedImages,
                img.id,
              ]);
            } else {
              setSelectedImages((prevSelectedImages) =>
                prevSelectedImages.filter((id) => id !== img.id),
              );
            }
            return { ...img, selected: updatedSelected };
          }
          return img;
        }),
      );
    }
  };

  const onDelete = async () => {
    if (deleteMode) {
      try {
        const response = await deletePhotos({ photoIds: selectedImages });
        setImageData((images) =>
          images.filter((img) => !selectedImages.includes(img.id)),
        );
        setDeleteMode(false);
        setSelectedImages([]);
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert('사진 삭제 중 오류가 발생했습니다.', error.message);
        } else {
          console.log('알 수 없는 에러', error);
        }
      }
    } else {
      setDeleteMode(true);
    }
  };

  const renderImageItem = ({
    item,
    index,
  }: {
    item: { uri: string; selected: boolean };
    index: number;
  }) => (
    <TouchableOpacity
      style={[styles.card, item.selected && styles.selected]}
      onPress={() => toggleImageSelected(index)}
    >
      <Image source={{ uri: item.uri }} style={styles.cardImage} />
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/background/MainBackground.png')}
      style={styles.ImageBackground}
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
          style={styles.cloud2}
        />
      </CloudAnimation>
      <CloudAnimation>
        <Image
          source={require('../../assets/images/Main/cloud.png')}
          style={styles.cloud3}
        />
      </CloudAnimation>
      <TouchableOpacity
        onPress={() => playTouch('duck')}
        style={[
          styles.duck,
          {
            transform: [
              { translateX: duckPosition.x },
              { translateY: duckPosition.y },
            ],
          },
        ]}
      >
        <Animated.Image
          source={require('../../assets/images/duck.png')}
          style={styles.duckImage}
        />
      </TouchableOpacity>
      <View style={styles.container}>
        <FlatList
          data={imageData}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={4}
          ListEmptyComponent={
            !isLoading && imageData.length === 0 ? <EmptyListComponent /> : null
          }
          style={styles.imagelist}
        />
      </View>
      <View style={styles.buttonContainer}>
        <GreenButton
          content={deleteMode ? '선택삭제' : '삭제하기'}
          onPress={onDelete}
          style={styles.buttonStyle}
        />
        <ImagePickerComponent readPhotos={readPhotos} />
      </View>
    </ImageBackground>
  );
}

export default PictureScreen;

const styles = StyleSheet.create({
  ImageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  duck: {
    position: 'absolute',
    bottom: '17%',
    left: '2%',
    width: '10%',
    height: '12%',
    zIndex: 10,
  },
  cloud: { position: 'absolute', top: 5, left: 200 },
  cloud2: {
    position: 'absolute',
    top: 5,
    left: 620,
    width: 200,
    height: 130,
    transform: [{ scaleX: -1 }],
  },
  cloud3: { position: 'absolute', top: 125, left: 1000 },
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  imagelist: {
    width: '90%',
    height: '80%',
    marginVertical: '7%',
    marginLeft: 85,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    gap: 30,
  },
  buttonStyle: {
    width: 180,
    margin: 30,
  },
  card: {
    marginTop: '20%',
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    width: 220,
    height: 220,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  selected: {
    borderWidth: 8,
    borderRadius: 10,
    borderColor: 'rgba(223, 143, 241, 0.551)',
  },

  duckImage: {
    width: '100%',
    height: '100%',
  },
});