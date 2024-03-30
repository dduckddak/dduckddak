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

import { SelectablePhotoData, PhotoData } from '../../types/types';
import { useFairyStore } from '../../store/fairyStore';

const { width } = Dimensions.get('screen');

const CARD_WIDTH = (width - 50) / 4; // 여기서 50은 카드 사이의 총 마진입니다.
const CARD_HEIGHT = CARD_WIDTH;

function AddPicture({ route, navigation }: any) {
  const { currentStep, role } = route.params;
  const [imageData, setImageData] = useState<SelectablePhotoData[]>([]);
  const [selectedImage, setSelectedImage] = useState<PhotoData | null>(null);

  const [selectMode, setSelectMode] = useState<boolean>();
  const { setMainImage, setSubImage } = useFairyStore();

  const readPhotos = async () => {
    try {
      const response = await getPhotos();
      if (response.photoList) {
        const fetchedImageData: SelectablePhotoData[] = response.photoList.map(
          (photo) => ({
            photoId: photo.photoId,
            photoFile: photo.photoFile,
            selected: false,
          }),
        );
        setImageData(fetchedImageData);
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
    console.log('Role:', route.params);
    readPhotos();
  }, []);

  // 이미지 선택
  const handleSelectImage = (index: number) => {
    const selected = imageData[index];
    setSelectedImage({
      photoId: selected.photoId,
      photoFile: selected.photoFile,
    });
    setSelectMode(true);
  };

  const handleCompleteSelection = () => {
    switch (currentStep) {
      case 1:
        setMainImage(selectedImage);
        break;
      case 2:
        setSubImage(selectedImage);
        break;
      default:
        Alert.alert('Error', 'Unknown role.');
        return;
    }
    setSelectMode(false);
    navigation.goBack();
  };

  const renderImageItem = ({
    item,
    index,
  }: {
    item: SelectablePhotoData;
    index: number;
  }) => (
    <TouchableOpacity
      style={[
        styles.card,
        selectedImage?.photoId === item.photoId && styles.selected,
      ]}
      onPress={() => handleSelectImage(index)}
    >
      <Image source={{ uri: item.photoFile }} style={styles.cardImage} />
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/background/MainBackground.png')}
      style={styles.imageBackground}
    >
      <Text style={styles.textStyle}>{role}의 얼굴 찾아주기</Text>
      <FlatList
        data={imageData}
        renderItem={renderImageItem}
        keyExtractor={(item) => item.photoId.toString()}
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
    marginTop: -30,
  },
  card: {
    margin: 5,
    marginTop: 0,
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
  textStyle: {
    fontFamily: 'im-hyemin-bold',
    fontSize: 48,
    marginTop: 25,
  },
});
