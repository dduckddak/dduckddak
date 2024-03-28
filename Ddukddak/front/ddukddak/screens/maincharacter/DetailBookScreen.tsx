import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Button,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { getBookDetail, BookDetailData } from '../../api/bookApi';
import { BookSummary } from '../../App';
import { createReview } from '../../api/bookApi'

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'detail'>;
type DetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'detail'
>;

interface DetailBookScreenProps {
  route: DetailScreenRouteProp;
  navigation: DetailScreenNavigationProp;
}

interface DetailBook {
  bookAuthor: string,
  bookStory: string,
  isLike: Boolean
}

function DetailBookScreen({ route, navigation }: DetailBookScreenProps) {
  const [selectedBook, setSelectedBook] = useState<DetailBook | undefined>();

  const bookSummary: BookSummary = route.params;

  const [isHappySelected, setIsHappySelected] = useState(false);
  const [isSadSelected, setIsSadSelected] = useState(false);

  const updateReview = async (like: boolean) => {
    // 리뷰 생성 또는 업데이트 로직
    try {
      const response = await createReview({
        bookId: bookSummary.bookId,
        like: like,
      });
      console.log(response);
      // checkLike(response.isLike);

    } catch (error) {
      console.error("Failed to update review:", error);
    }
  }

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
    }
    else {
      setIsSadSelected(true);
      setIsHappySelected(false);
    }
  }

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

  useEffect(() => {
    const fetchBook = async (bookid: number) => {
      try {
        const response = await getBookDetail(bookid);
        setSelectedBook(response.book);
        console.log(response.book)

        checkLike(response.book.isLike)

      } catch (error) {
        console.error('Failed:', error);
      }
    };
    fetchBook(bookSummary.bookId);
  }, []);



  return (
    <ImageBackground
      source={require('../../assets/images/background/detailbookbackground.png')}
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <Text style={styles.headerText}>이런책이에요 !</Text>
        <View style={styles.contentContainer}>
          <View style={styles.bookDetails}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: bookSummary.coverImage }}
                style={styles.coverImage}
              />
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  onPress={handleHappyPress}
                  style={styles.buttonStyle}
                >
                  <FontAwesome5
                    name="smile"
                    size={50}
                    color={isHappySelected ? 'green' : 'black'}
                  />
                  <Text style={styles.text}>재미있어요</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSadPress}
                  style={styles.buttonStyle}
                >
                  <Entypo
                    name="emoji-sad"
                    size={50}
                    color={isSadSelected ? 'red' : 'black'}
                  />
                  <Text style={styles.text}>재미없어요</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.detailText}>
                제목 : {bookSummary.bookTitle}
              </Text>
              <Text style={styles.detailText}>
                저자 : {selectedBook?.bookAuthor}
              </Text>
              <Text style={styles.detailText}>
                줄거리 : {selectedBook?.bookStory}
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('fairy' as never)}
            >
              <Image
                source={require('../../assets/images/button/donghwabutton.png')}
                style={styles.image}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => goToTalk(bookSummary.bookId)}
            >
              <Image
                source={require('../../assets/images/button/talkbutton.png')}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  },
  headerText: {
    fontSize: 50,
    fontFamily: 'im-hyemin-bold',
    marginVertical: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    width: '70%',
    gap: 20,
  },
  buttonStyle: {
    flexDirection: 'row',
    borderWidth: 3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'im-hyemin-bold',
  },
  detailText: {
    fontSize: 40,
    fontFamily: 'im-hyemin',
    marginVertical: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  imageContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginRight: 10,
  },
  textContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  bookDetails: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(65, 152, 7, 0.5)',
    backgroundColor: 'rgba(65, 152, 7, 0.5)',
    shadowColor: 'rgba(65, 152, 7, 0.5)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    margin: 10,
    padding: 10,
  },
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  image: {
    width: 333,
    height: 210,
    marginTop: 10,
  },
  coverImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
});

export default DetailBookScreen;
