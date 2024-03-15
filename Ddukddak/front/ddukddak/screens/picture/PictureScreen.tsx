import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Button,
  ScrollView,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

function CardComponent({ imageUri }: any) {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: imageUri }} style={styles.cardImage} />
    </View>
  );
}
function PictureScreen() {
  // const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const [images, setImages] = useState<string[]>([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // All 모두, Images 이미지만, Videos 비디오만
      allowsEditing: true, // 편집허가 여부
      aspect: [4, 3], // 사진 비율
      quality: 1, // 품질 0 ~ 1 1에 가까울수록 좋음
    });

    console.log(result);

    if (!result.canceled && result.assets?.length > 0) {
      setImages((current) => [...current, result.assets[0]?.uri]);
    }
  };

  const deleteImage = ({ index }: any) => {
    setImages((current) => current.filter((_, i) => i !== index));
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.imageBackground}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Button title="Add Image +" onPress={pickImage} />
        {images.map((uri, index) => (
          <View key={index} style={styles.cardContainer}>
            <CardComponent imageUri={uri} />
            <Button title="Delete" onPress={() => deleteImage({ index })} />
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: 200,
    height: 200,
  },
});

export default PictureScreen;
