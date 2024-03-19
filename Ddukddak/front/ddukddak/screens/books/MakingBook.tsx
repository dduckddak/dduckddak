import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

const imagePaths = [
  require('../../assets/images/books/bangmang/0.png'),
  require('../../assets/images/books/bangmang/1.png'),
  require('../../assets/images/books/bangmang/2.png'),
  require('../../assets/images/books/bangmang/3.png'),
  require('../../assets/images/books/bangmang/4.png'),
  require('../../assets/images/books/bangmang/5.png'),
  require('../../assets/images/books/bangmang/6.png'),
  require('../../assets/images/books/bangmang/7.png'),
  require('../../assets/images/books/bangmang/8.png'),
  require('../../assets/images/books/bangmang/9.png'),
  require('../../assets/images/books/bangmang/10.png'),
  require('../../assets/images/books/bangmang/11.png'),
  require('../../assets/images/books/bangmang/12.png'),
  require('../../assets/images/books/bangmang/13.png'),
  require('../../assets/images/books/bangmang/14.png'),
  require('../../assets/images/books/bangmang/15.png'),
  require('../../assets/images/books/bangmang/16.png'),
  require('../../assets/images/books/bangmang/17.png'),
  require('../../assets/images/books/bangmang/18.png'),
  require('../../assets/images/books/bangmang/19.png'),
  require('../../assets/images/books/bangmang/0.png'),
  require('../../assets/images/books/bangmang/20.png'),
];

const MakingBook: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onNextPress = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 2 < imagePaths.length ? prevIndex + 2 : prevIndex,
    );
  };

  const onPrevPress = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 2 >= 0 ? prevIndex - 2 : prevIndex,
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background/background.png')}
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={imagePaths[currentIndex]} style={styles.image} />
          {currentIndex + 1 < imagePaths.length && (
            <Image source={imagePaths[currentIndex + 1]} style={styles.image} />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onPrevPress}>
            <Text style={styles.button}>이전</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNextPress}>
            <Text style={styles.button}>다음</Text>
          </TouchableOpacity>
        </View>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // 이미지 컨테이너에 position: 'relative' 추가
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute', // 버튼 컨테이너에 position: 'absolute' 추가
    bottom: 20, // 아래쪽 여백 조정
  },
  button: {
    fontSize: 18,
    color: 'blue',
    marginHorizontal: 20,
  },
});

export default MakingBook;
