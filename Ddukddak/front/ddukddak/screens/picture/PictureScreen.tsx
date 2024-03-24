import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import GreenButton from '../../components/GreenButton';
import ImagePickerComponent from '../../components/picture/ImagePicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getPhotos } from '../../api/photoApi';

const { width } = Dimensions.get('window');

const CARD_WIDTH = (width - 50) / 4; // 여기서 50은 카드 사이의 총 마진입니다.
const CARD_HEIGHT = CARD_WIDTH;

function PictureScreen() {
  const [images, setImages] = useState<{ uri: string; selected: boolean }[]>(
    [],
  );
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await getPhotos();
        if (response.photoList) {
          setImages(
            response.photoList.map((photo) => ({
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
      }
    };

    fetchPhotos();
  }, []);

  // 이미지 선택 로직
  const toggleImageSelected = (index: number) => {
    // 삭제 모드일 때만 선택 가능
    if (deleteMode) {
      setImages((images) =>
        images.map((img, i) =>
          i === index ? { ...img, selected: !img.selected } : img,
        ),
      );
    }
  };

  const handleImageSelected = (uri: string) => {
    setImages((prevImages) => [...prevImages, { uri, selected: false }]);
  };

  const onDelete = () => {
    if (!deleteMode) {
      setDeleteMode(true); // 삭제 모드 활성화
    } else {
      setImages((images) => images.filter((img) => !img.selected));
      setDeleteMode(false); // 삭제 모드 해제
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
      <View style={styles.container}>
        <FlatList
          data={images}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={4}
        />
      </View>
      <View style={styles.buttonContainer}>
        <GreenButton
          content={deleteMode ? '선택삭제' : '삭제하기'}
          onPress={onDelete}
          style={styles.buttonStyle}
        />
        <ImagePickerComponent onImageSelected={handleImageSelected} />
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
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
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
    width: '10%',
    margin: 30,
  },
  card: {
    marginTop: '5%',
    marginLeft: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  selected: {
    borderColor: 'blue',
    borderWidth: 2,
  },
});
