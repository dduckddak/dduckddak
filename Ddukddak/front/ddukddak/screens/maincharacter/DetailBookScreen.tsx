import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Animated,
  Pressable,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { getBookDetail } from '../../api/bookApi';
import { BookSummary, DetailBook } from '../../types/types';
import { createReview } from '../../api/bookApi';
import { Dimensions } from 'react-native';
import useTimeStore from '../../store/timeStore';
import AlertModal from '../../components/AlertModal';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

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

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'detail'>;
type DetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'detail'
>;

interface DetailBookScreenProps {
  route: DetailScreenRouteProp;
  navigation: DetailScreenNavigationProp;
}

function DetailBookScreen({ route, navigation }: DetailBookScreenProps) {
  const [selectedBook, setSelectedBook] = useState<DetailBook>();
  const [modalVisible, setModalVisible] = useState(false);

  const bookSummary: BookSummary = route.params;

  const [isHappySelected, setIsHappySelected] = useState(false);
  const [isSadSelected, setIsSadSelected] = useState(false);

  const { fontColor, backgroundSrc } = useTimeStore();

  const updateReview = async (like: boolean) => {
    // 리뷰 생성 또는 업데이트 로직
    try {
      const response = await createReview({
        bookId: bookSummary.bookId,
        like: like,
      });
      console.log(response);
    } catch (error) {
      console.error('Failed to update review:', error);
    }
  };

  const checkLike = (isLike: Boolean) => {
    if (isLike == null) {
      setIsHappySelected(false);
      setIsSadSelected(false);
      return;
    }
    if (isLike) {
      setIsHappySelected(true);
      setIsSadSelected(false);
      return;
    } else {
      setIsSadSelected(true);
      setIsHappySelected(false);
    }
  };

  const happyImage = isHappySelected
    ? require('../../assets/images/books/interested_clicked.png')
    : require('../../assets/images/books/interested.png');

  const sadImage = isSadSelected
    ? require('../../assets/images/books/uninterested_clicked.png')
    : require('../../assets/images/books/uninterested.png');

  const handleHappyPress = async () => {
    setIsHappySelected((prev) => !prev);
    setIsSadSelected(false);
    await updateReview(true);
  };

  const handleSadPress = async () => {
    setIsSadSelected((prev) => !prev);
    setIsHappySelected(false);
    await updateReview(false);
  };

  const goToTalk = (id: number) => {
    navigation.navigate('talk', { bookId: id });
  };

  const fetchBook = async (bookid: number) => {
    try {
      const response = await getBookDetail(bookid);
      setSelectedBook(response.book);
      console.log(response.book);

      checkLike(response.book.isLike);
    } catch (error) {
      console.error('Failed:', error);
    }
  };

  useEffect(() => {
    fetchBook(bookSummary.bookId);
  }, []);

  return (
    <ImageBackground
      // source={require('../../assets/images/background/morning.jpg')}
      source={backgroundSrc}
      style={styles.imageBackground}
    >
      <CloudAnimation>
        <Image
          source={require('../../assets/images/Main/cloud.png')}
          style={styles.cloud}
        />
        <CloudAnimation>
          <Image
            source={require('../../assets/images/Main/cloud.png')}
            style={styles.cloud1}
          />
        </CloudAnimation>
      </CloudAnimation>
      <View style={styles.container}>
        <Text style={[styles.headerText, { color: fontColor }]}>
          📚 이런책이에요 📚
        </Text>
        <View style={styles.contentContainer}>
          <View style={styles.bookDetails}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: bookSummary.coverImage }}
                style={styles.coverImage}
              />
              <View style={styles.buttonsContainer}>
                <Pressable
                  onPress={() => handleHappyPress()}
                  style={({ pressed }) => [
                    styles.buttonStyle,
                    {
                      opacity: pressed ? 0.3 : 1,
                    },
                  ]}
                >
                  <Image source={happyImage} />
                </Pressable>
                <Pressable
                  onPress={() => handleSadPress()}
                  style={({ pressed }) => [
                    styles.buttonStyle,
                    { marginTop: screenHeight * 0.023 },
                    {
                      opacity: pressed ? 0.3 : 1,
                    },
                  ]}
                >
                  <Image source={sadImage} />
                </Pressable>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.detailText}>
                제목 : {bookSummary.bookTitle}
              </Text>
              <Text style={styles.detailText}>
                저자 : {selectedBook?.bookAuthor}
              </Text>
              {selectedBook?.bookStory && (
                <Text style={styles.detailText2}>
                  줄거리 :{' '}
                  {selectedBook.bookStory.length > 110
                    ? selectedBook.bookStory.slice(0, 110) + ' ...'
                    : selectedBook.bookStory}
                </Text>
              )}
            </View>
          </View>
          <View>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                {
                  opacity: pressed ? 0.3 : 1,
                },
              ]}
              onPress={() => {
                if (![121, 122, 123].includes(bookSummary.bookId)) {
                  setModalVisible(true);
                } else {
                  selectedBook &&
                    bookSummary &&
                    navigation.navigate('fairy', {
                      selectedBook: selectedBook,
                      bookSummary: bookSummary,
                    });
                }
              }}
            >
              <Image
                source={require('../../assets/images/button/donghwabutton.png')}
                style={styles.image}
              />
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                {
                  opacity: pressed ? 0.3 : 1,
                },
              ]}
              onPress={() => {
                if (![121, 122, 123].includes(bookSummary.bookId)) {
                  setModalVisible(true);
                } else {
                  // Proceed with the function if the book ID is allowed
                  goToTalk(bookSummary.bookId);
                }
              }}
            >
              <Image
                source={require('../../assets/images/button/talkbutton.png')}
                style={styles.image}
              />
            </Pressable>
          </View>
        </View>
      </View>

      {/* 모달 위치 */}
      <AlertModal
        isVisible={modalVisible}
        text={['이 동화는', '추후 공개 예정입니다.']}
        onConfirm={() => setModalVisible(false)}
      />
      {/* 모달 위치 */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  cloud: {
    position: 'absolute',
    top: 60,
    left: 150,
    width: 100,
    height: 110,
  },
  cloud1: {
    position: 'absolute',
    top: 5,
    left: 800,
    width: 170,
    height: 150,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  headerText: {
    fontSize: 65,
    fontFamily: 'im-hyemin-bold',
    marginVertical: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    width: screenWidth * 0.31,
  },
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: screenHeight * 0.02,
    marginBottom: -10,
  },
  text: {
    fontFamily: 'im-hyemin-bold',
  },
  detailText: {
    fontSize: 35,
    fontFamily: 'im-hyemin-bold',
    marginVertical: 5,
  },
  detailText2: {
    fontSize: 30,
    fontFamily: 'im-hyemin',
    marginVertical: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  textContainer: {
    flex: 2,
    // justifyContent: 'center',
  },
  bookDetails: {
    // flex: 1,
    flexDirection: 'row',
    borderRadius: 20,
    width: Dimensions.get('screen').width * 0.65,
    height: Dimensions.get('screen').height * 0.65,
    backgroundColor: '#B2DAC8',
    borderWidth: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    margin: 10,
    marginTop: 40,
    padding: 25,
  },
  button: {
    padding: 10,
    marginVertical: 22,
    borderRadius: 5,
  },
  image: {
    width: 333,
    height: 210,
    marginTop: screenHeight * 0.015,
  },
  coverImage: {
    width: '95%',
    height: screenHeight * 0.45,
    resizeMode: 'contain',
    borderWidth: 5,
  },
});

export default DetailBookScreen;
