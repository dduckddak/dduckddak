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
  const { role, onPictureSelected } = route.params;
  const {
    mainImageUri,
    mainVoiceUri,
    rolesImageUri,
    rolesVoiceUri,
    narrationVoiceUri,
    bookName,
    selectedImageIndex,
    setMainImageUri,
    setMainVoiceUri,
    setRolesImageUri,
    setRolesVoiceUri,
    setNarrationVoiceUri,
    setBookName,
    setSelectedImageIndex,
  } = Fairystore();
  const [images, setImages] = useState<{ uri: string; selected: boolean }[]>(
    [],
  );
  const [selectMode, setSelecteMode] = useState(false);
  const setSelectedImageIndexStore = Fairystore(
    (state) => state.setSelectedImageIndex,
  );

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

  useEffect(() => {
    fetchPhotos();
  }, []);

  const toggleImageSelected = (index: number) => {
    setSelectedImageIndex(index);
    setSelectedImageIndexStore(index);
  };

  const completeSelection = () => {
    if (selectedImageIndex !== null) {
      const selectedImage = images[selectedImageIndex];
      onPictureSelected(selectedImage.uri);
      navigation.goBack();
    } else {
      Alert.alert('사진을 선택해주세요.');
    }
  };

  // 이미지 선택 로직
  const handleImageSelected = (uri: string) => {
    setImages((prevImages) => [...prevImages, { uri, selected: false }]);
  };

  const renderImageItem = ({
    item,
    index,
  }: {
    item: { uri: string; selected: boolean };
    index: number;
  }) => (
    <TouchableOpacity
      style={[styles.card, selectedImageIndex === index && styles.selected]}
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
        <Text>{role}의 얼굴 찾아주기</Text>
        <FlatList
          data={images}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={4}
        />
      </View>
      <View style={styles.buttonContainer}>
        <GreenButton
          content={selectMode ? '선택완료' : '선택하기'}
          onPress={completeSelection}
          style={styles.buttonStyle}
        />
        <ImagePickerComponent onImageSelected={handleImageSelected} />
      </View>
    </ImageBackground>
  );
}

export default AddPicture;

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
    marginTop: '20%',
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
