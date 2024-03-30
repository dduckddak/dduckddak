import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions, // Dimensions import 추가
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { getMakeBookDetail } from '../../api/makeBookApi';
import { BookDetail, PageData } from '../../types/types';
import * as url from 'node:url';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;


type BookDetailScreenRouteProp = RouteProp<
  { params: { makeBookId: string } },
  'params'
>;

const MakingBook: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bookDetails, setBookDetails] = useState<PageData[]>([]);

  const route = useRoute<BookDetailScreenRouteProp>();
  const makeBookId = route.params.makeBookId;


  const onNextPress = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 2 < bookDetails.length ? prevIndex + 2 : prevIndex,
    );
  };

  const onPrevPress = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 2 >= 0 ? prevIndex - 2 : prevIndex,
    );
  };

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await getMakeBookDetail(makeBookId);
        setBookDetails(response.bookDetail);
        console.log(response.bookDetail[0]);
      } catch (error) {
        console.error('Failed', error);
      }
    };

    fetchBookDetails();
  }, [makeBookId]);

  if (!bookDetails) {
    return <Text>Loading...</Text>;
  }


  const pageRendering = () => {
    if (bookDetails.length === 0) {
      return null;
    }

    return (
      <View style={styles.bookFrameContainer}>
        <View style={styles.bookInnerContainer}>
          <Image
            style={styles.pageImage}
            source={{ uri: bookDetails[currentIndex].pageImage }}
            resizeMode="cover"
          />
          <Text style={styles.caption}>
            {bookDetails[currentIndex].pageDetail.map(detail => detail.scriptContent).join('\n')}
          </Text>
        </View>

        <View style={styles.bookInnerContainer}>
          <Image
            style={styles.pageImage}
            source={{ uri: bookDetails[currentIndex + 1].pageImage }}
            resizeMode="cover"
          />
          <Text style={styles.caption}>
            {bookDetails[currentIndex + 1].pageDetail.map(detail => detail.scriptContent).join('\n')}
          </Text>
        </View>
      </View>
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {pageRendering()}
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'column',
    borderWidth: 2,
    height: '85%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
  bookFrameContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'purple',
    width: '98%',
    height: '98%',
  },
  bookInnerContainer: {
    position:'relative',
    height: '100%',
    width: '50%',
    borderWidth:1,
    borderColor: 'yellow',
  },
  pageImage: {
    height: '100%',
    width: '100%',
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

});

export default MakingBook;
