import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import GreenButton from '../../components/GreenButton';
import ImagePickerComponent from '../../components/picture/ImagePicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getPhotos } from '../../api/photoApi';

import { SelectablePhotoData, PhotoData } from '../../types/types';
import { useFairyStore } from '../../store/fairyStore';

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
      case 2:
        setMainImage(selectedImage);
        break;
      case 3:
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
      <Text style={styles.textStyle}>{role}의 얼굴을 찾아줘</Text>
      <Text style={styles.textStyle2}>
        ( 사진을 선택하지 않으면 동화속 인물의 얼굴이 들어가요)
      </Text>
      <FlatList
        data={imageData}
        renderItem={renderImageItem}
        keyExtractor={(item) => item.photoId.toString()}
        numColumns={4}
        contentContainerStyle={styles.listContentContainer}
        style={styles.imagelist}
      />
      <View style={styles.buttonContainer}>
        <ImagePickerComponent readPhotos={readPhotos} />
        <GreenButton
          content={selectMode ? '선택완료' : '선택하기'}
          onPress={handleCompleteSelection}
          style={styles.button}
        />
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
    marginTop: -12,
    alignItems: 'center',
  },
  button: {
    width: '14.5%',
  },
  imagelist: {
    width: '95%',
    marginVertical: '1%',
    height: '80%',
    marginLeft: 20,
  },
  card: {
    marginTop: '20%',
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    width: 240,
    height: 240,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  selected: {
    borderWidth: 7,
    borderColor: 'rgba(180, 130, 210, 0.8)',
  },
  textStyle: {
    fontFamily: 'im-hyemin-bold',
    fontSize: 48,
    marginTop: 55,
  },
  textStyle2: {
    fontFamily: 'im-hyemin-bold',
    fontSize: 28,
    marginTop: 20,
  },
});
