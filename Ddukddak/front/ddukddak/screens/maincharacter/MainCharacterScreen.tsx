import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getBookList, BookListData, searchBooks } from '../../api/bookApi';
import { BookSummary } from '../../App';

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
  const [showSearch, setShowSearch] = useState(false); // 검색 입력 창 표시 여부
  const [searchText, setSearchText] = useState('');

  const [bookList, setBookList] = useState<BookSummary[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // const books = await getBookList();

        // setBookList(books);
        setBookList(tempBookData.bookList);
      } catch (error) {
        console.error('Failed:', error);
      }
    };
    console.log(bookList);
    fetchBooks();
  }, []);

  const handleToggleOrSearch = () => {
    if (showSearch && searchText.trim()) {
      // 검색창이 표시되어 있고, 검색어가 입력된 상태에서 검색 실행
      handleSearch();
    } else {
      // 그렇지 않은 경우에는 검색창의 표시 상태만 토글
      setShowSearch(!showSearch);
      // 검색창을 닫을 때 검색어 초기화 (선택적)
      if (showSearch) setSearchText('');
    }
  };

  const handleSearch = async () => {
    if (searchText.trim() === '') {
      alert('검색어를 입력해주세요.');
      return;
    }

    try {
      // searchBooks 함수를 호출하여 검색 결과를 받아옵니다.
      const response = await searchBooks(searchText.trim());

      // 검색 결과 중 첫 번째 책을 가져옵니다. (검색 결과가 있을 경우)
      const foundBook = response.searchBookList
        ? response.searchBookList[0]
        : null;

      if (foundBook) {
        navigation.navigate('detail', { bookId: foundBook.bookId });
        setSearchText(''); // 검색 후 입력 필드 초기화
      } else {
        alert('일치하는 책이 없습니다.');
      }
    } catch (error) {
      console.error('filed:', error);
      alert('검색 중 오류가 발생했습니다.');
    }
  };

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
          <View style={styles.container}>
            <TouchableOpacity onPress={previousPage}>
              <Image
                source={require('../../assets/images/button/before.png')}
              />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              {bookList.length > 0 && (
                <Pressable onPress={() => goToDetail(bookList[currentPage])}>
                  <View style={styles.box}>
                    <Text style={styles.text}>이 책 어때요 ?</Text>
                    <Image
                      source={{ uri: bookList[currentPage].coverImage }}
                      style={styles.bookCover}
                    />
                    <Text style={styles.titletext}>
                      제목 : {bookList[currentPage].bookTitle}
                    </Text>
                  </View>
                </Pressable>
              )}
            </View>
            <TouchableOpacity onPress={nextPage}>
              <Image source={require('../../assets/images/button/next.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.searchButtonAndInputContainer}>
            <Pressable onPress={handleToggleOrSearch}>
              <MaterialCommunityIcons
                name="card-search-outline"
                size={100}
                color="#C5E1C9"
              />
            </Pressable>
            {showSearch && (
              <TextInput
                style={styles.searchInput}
                placeholder="책 제목을 검색해보세요."
                value={searchText}
                onChangeText={setSearchText}
                onSubmitEditing={handleSearch}
              />
            )}
          </View>
          <View style={styles.Likebutton}>
            <Pressable onPress={() => navigation.navigate('likeList')}>
              <MaterialCommunityIcons
                name="heart-box-outline"
                size={100}
                color="red"
              />
            </Pressable>
          </View>
          <View style={styles.dotsContainer}>
            {bookList &&
              bookList.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === currentPage
                      ? styles.activeDot
                      : styles.inactiveDot,
                  ]}
                />
              ))}
          </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  searchButtonAndInputContainer: {
    position: 'absolute',
    right: 10,
    top: 80,
    zIndex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  Likebutton: {
    position: 'absolute',
    left: 10,
    top: 80,
    zIndex: 1,
  },
  box: {
    borderWidth: 1,
    borderColor: 'rgba(65, 152, 7, 0.23)',
    backgroundColor: 'rgba(65, 152, 7, 0.23)',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 700,
    height: 500,
    borderRadius: 20,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'im-hyemin-bold',
    fontSize: 60,
  },
  titletext: {
    textAlign: 'center',
    fontFamily: 'im-hyemin-bold',
    fontSize: 48,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    paddingTop: '250%',
    paddingLeft: '280%',
  },
  dot: {
    width: 35,
    height: 35,
    borderRadius: 30,
    margin: 20,
  },
  activeDot: {
    backgroundColor: '#254E5A',
  },
  inactiveDot: {
    backgroundColor: '#B3DABF',
  },
  bookCover: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
  },
  searchContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#C5E1C9',
    width: 500,
    fontFamily: 'im-hyemin-bold',
    fontSize: 20,
  },
});

export default MainCharacterScreen;
