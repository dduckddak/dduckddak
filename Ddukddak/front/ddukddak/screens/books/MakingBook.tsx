import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions, // Dimensions import 추가
} from 'react-native';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

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
  require('../../assets/images/books/bangmang/20.png'),
  require('../../assets/images/books/bangmang/0.png'),
];

const captions = [
  '도깨비방망이 시작',
  '옛날 옛날 욕심쟁이 형과',
  '마음 착한 아우가 살았어요',
  '어느날 아우가 산에서 나무를 하는데 개암이 세개가 뚝 떨어졌어요',
  '“어? 개암이네 이건 부모님과 형님께 드려야겠다”',
  '집에 가려는데 날이 저물어 저녁이 되었어요 “어? 벌써 이렇게 되었나? 서둘러 가야겠다”',
  '아우는 내려가는길 비까지 와서 내려가기가 너무 어려웠어요 아우는 마침 낡은 집 한 채를 발견했어요 “오늘밤은 오늘 여기서 보내야겠다”',
  '아우가 한참 자고있을때 “에헤라 ~ 오늘도 어디 신명 나게 놀아 볼까 ?”',
  '시끄러운 소리에 아우는 깜짝 놀라 대들보 위로 숨었어요',
  '“얼쑤 절쑤 금나와라 뚝딱, 얼쑤 ~ 절쑤 ~ 은 나와라 뚝딱” 도깨비들이 방망이를 뚝딱 내리칠 때마다 금은보화가 와르르 쏟아져 나왔어요.',
  '한참 숨어서 지켜보던 아우는 슬슬 배가 고팠어요',
  '“ 아! 맞다. 개암이 있지!” 아우는 개암을 하나꺼내 꽉 깨물었어요',
  '그런데 도깨비들이 더 놀랐어요 “어? 이게 무슨소리지?” “어? 집이 무너지려나 봐! 모두 도망쳐!!”',
  '도깨비들은 방망이도 팽개치고 꽁지 빠지게 달렸어요',
  '덕분에 아우는 마을에서 큰 부자가 되었지요.',
  '이 소식을 들은 욕심쟁이 형은 그 길로 개암을 따서 빈집을 찾아갔어요.',
  '대들보 위에 숨어서 한참을 기다리는데 정말로 도깨비들이 나타났어요.',
  '“이제 나도 큰 부자가 되겠구나!” 형은 기회를 보다가 개암을 꺼내 꽉 깨물었어요.',
  '“ 그놈이 또왔다!',
  '“저위에 있다! 이번에도 속을줄 알고?” 형대사”어..? 이게 아닌데?”',
  '도깨비들이 대들보 위에 숨 있는 형을 찾아냈어요. 그리고는 떠억 떡, 밤새 형의 볼기를 쳤답니다.',
  '끝~~!!',
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
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* 이미지와 캡션을 매핑하여 렌더링 */}
        {imagePaths
          .slice(currentIndex, currentIndex + 2)
          .map((imagePath, index) => (
            <View key={index}>
              <Image
                source={imagePath}
                style={[
                  styles.image,
                  { width: windowWidth / 2, height: windowHeight },
                ]}
              />
              <Text style={styles.caption}>
                {splitCaption(captions[currentIndex + index])}
              </Text>
            </View>
          ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPrevPress}>
          <Image
            source={require('../../assets/images/button/white_back_button.png')}
            style={styles.backbutton}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onNextPress}>
          <Image
            source={require('../../assets/images/button/white_back_button.png')}
            style={styles.nextbutton}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// 캡션을 최대 20자씩 나오도록 분할하는 함수
const splitCaption = (caption: string): string => {
  if (caption.length <= 20) return caption;
  const firstLine = caption.slice(0, 26);
  const remainingChars = caption.slice(26);
  if (remainingChars.length <= 26) {
    return firstLine + '\n' + remainingChars;
  } else {
    return firstLine + '\n' + splitCaption(remainingChars);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
  },
  image: {
    resizeMode: 'cover',
    marginHorizontal: 10,
  },
  caption: {
    textAlign: 'center',
    position: 'absolute',
    bottom: 25, // 이미지 아래에 위치
    width: '100%', // 부모 요소에 꽉 차게 설정
    fontFamily: 'im-hyemin-bold',
    fontSize: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
  },
  backbutton: {
    width: 71,
    height: 107,
    position: 'absolute',
    right: 550,
    bottom: 300,
  },
  nextbutton: {
    width: 71,
    height: 107,
    transform: [{ scaleX: -1 }],
    position: 'absolute',
    left: 550,
    bottom: 300,
  },
});

export default MakingBook;
