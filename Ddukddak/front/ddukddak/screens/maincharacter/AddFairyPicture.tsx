import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
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
import Fairystore from '../../store/Fairystore';

const { width } = Dimensions.get('screen');

const CARD_WIDTH = (width - 50) / 4; // 여기서 50은 카드 사이의 총 마진입니다.
const CARD_HEIGHT = CARD_WIDTH;

function AddPicture({ route, navigation }: any) {
  const { role } = route.params;
  const [imageData, setImageData] = useState<
    { uri: string; selected: boolean; id: number }[]
  >([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [selectMode, setSelecteMode] = useState(false);
  const setMainImageIdx = Fairystore((state) => state.setMainImageIdx);
  const setSubImageIdx = Fairystore((state) => state.setSubImageIdx);

  const readPhotos = async () => {
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
    }
  };

  useEffect(() => {
    console.log('Role:', role);
    readPhotos();
  }, []);

  // 이미지 선택 로직
  const handleSelectImage = (index: any) => {
    setSelectedImageIndex(index);
    setSelecteMode(true);
  };

  const handleCompleteSelection = () => {
    switch (role) {
      case 'main':
        setMainImageIdx(selectedImageIndex);
        break;
      case 'sub':
        setSubImageIdx(selectedImageIndex);
        break;
      default:
        Alert.alert('Error', 'Unknown role.');
        return;
    }
    setSelecteMode(false);
    navigation.goBack();
  };

  const renderImageItem = ({ item, index }: any) => (
    <TouchableOpacity
      style={[styles.card, selectedImageIndex === index && styles.selected]}
      onPress={() => handleSelectImage(index)}
    >
      <Image source={{ uri: item.uri }} style={styles.cardImage} />
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/background/MainBackground.png')}
      style={styles.imageBackground}
    >
      <FlatList
        data={imageData}
        renderItem={renderImageItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={4}
        contentContainerStyle={styles.listContentContainer}
        style={styles.imagelist}
      />
      <View style={styles.buttonContainer}>
        <GreenButton
          content={selectMode ? '선택완료' : '선택하기'}
          onPress={handleCompleteSelection}
          style={styles.button}
        />
        <ImagePickerComponent />
      </View>
    </ImageBackground>
  );
}

export default AddPicture;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '14%',
  },
  imagelist: {
    width: '80%',
    height: '80%',
    marginHorizontal: '11%',
    marginVertical: '7%',
  },
  card: {
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  selected: {
    borderWidth: 2,
    borderColor: 'blue',
  },
});
