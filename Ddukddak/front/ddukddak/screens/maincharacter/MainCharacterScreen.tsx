import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface MainCharacterScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

export const books = [
  {
    id: 1,
    coverName: 'cover-book-title-1.jpg',
    title: '잭과콩나무',
    author: 'Author Name 1',
    synopsis: 'This is the synopsis of Book Title 1. It talks about...',
    coverImage: require('../../assets/images/bookcover.png'),
  },

  {
    id: 2,
    coverName: 'cover-book-title-2.jpg',
    title: '빨간모자',
    author: 'Author Name 2',
    synopsis:
      'This is the synopsis of Book Title 2. It explores the concept of...',
    coverImage: require('../../assets/images/bookcover.png'),
  },
  {
    id: 3,
    coverName: 'cover-book-title-3.jpg',
    title: '도깨비 방망이',
    author: 'Author Name 3',
    synopsis:
      'This is the synopsis of Book Title 3. The story revolves around...',
    coverImage: require('../../assets/images/bookcover.png'),
  },
  {
    id: 4,
    coverName: 'cover-book-title-4.jpg',
    title: '책일',
    author: 'Author Name 4',
    synopsis:
      'This is the synopsis of Book Title 4. It delves into the life of...',
    coverImage: require('../../assets/images/bookcover.png'),
  },
  {
    id: 5,
    coverName: 'cover-book-title-5.jpg',
    title: '책이',
    author: 'Author Name 5',
    synopsis:
      'This is the synopsis of Book Title 5. A tale of adventure and...',
    coverImage: require('../../assets/images/bookcover.png'),
  },
  {
    id: 6,
    coverName: 'cover-book-title-6.jpg',
    title: '책삼',
    author: 'Author Name 6',
    synopsis: 'This is the synopsis of Book Title 6. Exploring themes of...',
    coverImage: require('../../assets/images/bookcover.png'),
  },
  {
    id: 7,
    coverName: 'cover-book-title-7.jpg',
    title: '책사',
    author: 'Author Name 7',
    synopsis:
      'This is the synopsis of Book Title 7. A gripping narrative about...',
    coverImage: require('../../assets/images/bookcover.png'),
  },
];

const MainCharacterScreen: React.FC<MainCharacterScreenProps> = ({
  navigation,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showSearch, setShowSearch] = useState(false); // 검색 입력 창 표시 여부
  const [searchText, setSearchText] = useState('');

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

  const handleSearch = () => {
    if (searchText.trim() === '') {
      alert('검색어를 입력해주세요.');
      return;
    }
    const foundBook = books.find((book) => book.title.includes(searchText));
    if (foundBook) {
      console.log(foundBook);
      navigation.navigate('detail', { bookId: foundBook.id });
      setSearchText('');
    } else {
      alert('일치하는 책이 없습니다.');
    }
  };

  const nextPage = () => {
    setCurrentPage((prevCurrentPage) => (prevCurrentPage + 1) % books.length);
  };

  const previousPage = () => {
    setCurrentPage(
      (prevCurrentPage) => (prevCurrentPage + books.length - 1) % books.length,
    );
  };

  const goToDetail = (id: number) => {
    navigation.navigate('detail', { bookId: id });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.imageBackground}
    >
      <View style={styles.flexContainer}>
        <View style={styles.container}>
          <TouchableOpacity onPress={previousPage}>
            <Image source={require('../../assets/images/before.png')} />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Pressable onPress={() => goToDetail(books[currentPage].id)}>
              <View style={styles.box}>
                <Text style={styles.text}>이 책 어때요 ?</Text>
                <Image
                  source={books[currentPage].coverImage}
                  style={styles.bookCover}
                />
                <Text style={styles.titletext}>
                  제목 : {books[currentPage].title}
                </Text>
              </View>
            </Pressable>
          </View>
          <TouchableOpacity onPress={nextPage}>
            <Image source={require('../../assets/images/next.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchButtonAndInputContainer}>
          <Pressable onPress={handleToggleOrSearch}>
            {/* <FontAwesome name="search" size={36} color="green" /> */}
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
        <View style={styles.dotsContainer}>
          {books.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentPage ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
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
    top: 10,
    zIndex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
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
    paddingTop: '100%',
    paddingLeft: '125%',
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
  },
});

export default MainCharacterScreen;
