import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Text,
  Animated,
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { getBookList } from '../../api/bookApi';
import { BookSummary } from '../../App';
import BookList from './childs/BookList';
import Dots from './childs/Dots';
import { Image } from 'react-native';

interface MainCharacterScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const tempBookData = {
  bookList: [
    {
      bookId: 121,
      bookTitle: '잭과 콩나무',
      coverImage:
        'https://ddukddak.s3.ap-northeast-2.amazonaws.com/default_book/121/nonblank/0.png',
    },
    {
      bookId: 122,
      bookTitle: '빨간 모자',
      coverImage:
        'https://ddukddak.s3.ap-northeast-2.amazonaws.com/default_book/122/nonblank/0.png',
    },
    {
      bookId: 123,
      bookTitle: '도깨비 방망이',
      coverImage:
        'https://ddukddak.s3.ap-northeast-2.amazonaws.com/default_book/123/nonblank/0.png',
    },
  ],
};

const MainCharacterScreen: React.FC<MainCharacterScreenProps> = ({
  navigation,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [bookList, setBookList] = useState<BookSummary[]>([]);
  // 구름 두둥실
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
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await getBookList();
        console.log(books);
        if (books.bookList) {
          setBookList(books.bookList);
        }
        // setBookList(tempBookData.bookList);
      } catch (error) {
        console.error('Failed:', error);
      }
    };
    console.log(bookList);
    fetchBooks();
  }, []);

  const nextPage = () => {
    setCurrentPage(
      (prevCurrentPage) => (prevCurrentPage + 1) % bookList.length,
    );
  };

  const previousPage = () => {
    setCurrentPage(
      (prevCurrentPage) =>
        (prevCurrentPage + bookList.length - 1) % bookList.length,
    );
  };

  const goToDetail = (bookSummary: BookSummary | undefined) => {
    navigation.navigate('detail', bookSummary);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background/background3.png')}
      style={styles.imageBackground}
    >
      <CloudAnimation>
        <Image
          source={require('../../assets/images/Main/cloud.png')}
          style={styles.cloud}
        />
      </CloudAnimation>
      {/* <CloudAnimation>
    <Image
      source={require('../../assets/images/Main/cloud.png')}
      style={styles.cloud1}
    />
  </CloudAnimation> */}
      <CloudAnimation>
        <Image
          source={require('../../assets/images/Main/cloud.png')}
          style={styles.cloud2}
        />
      </CloudAnimation>
      <CloudAnimation>
        <Image
          source={require('../../assets/images/Main/cloud.png')}
          style={styles.cloud3}
        />
      </CloudAnimation>
      <Text style={styles.howabout}>이 책 어때요??</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* 1(공백) : 4(책 목록)  1(도트컨테이너)로 flex 분배 해놓음*/}
        <View style={styles.flexContainer}>
          <View
            style={{
              flex: 1,
            }}
          />
          <BookList
            bookList={bookList}
            currentPage={currentPage}
            previousPage={previousPage}
            nextPage={nextPage}
            goToDetail={goToDetail}
            navigation={navigation}
          />
          <Dots bookList={bookList} currentPage={currentPage} />
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  cloud: { position: 'absolute', top: 45, left: 130 },
  // cloud1: { position: 'absolute', top: 30, left: 400, width: 220, height: 140 },
  cloud2: {
    position: 'absolute',
    top: 150,
    left: -30,
    width: 200,
    height: 130,
    transform: [{ scaleX: -1 }],
  },
  cloud3: { position: 'absolute', top: 5, left: 950, width: 160, height: 130 },
  howabout: {
    fontFamily: 'im-hyemin-bold',
    fontSize: 65,
    alignSelf: 'center',
    paddingTop: 50,
  },
  flexContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    // borderWidth: 1,
  },
});

export default MainCharacterScreen;
