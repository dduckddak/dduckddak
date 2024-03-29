import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { getBookList } from '../../api/bookApi';
import { BookSummary } from '../../App';
import BookList from './childs/BookList';
import Dots from './childs/Dots';

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
      source={require('../../assets/images/background/background.png')}
      style={styles.imageBackground}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.flexContainer}>
          {/* 1(공백) : 4(책 목록)  1(도트컨테이너)로 flex 분배 해놓음*/}

          {/* 윗부분 비우려고 쓰는 텅 빈 View 영역 */}
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
  flexContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'relative',
    // borderWidth: 1,
  },
});

export default MainCharacterScreen;
