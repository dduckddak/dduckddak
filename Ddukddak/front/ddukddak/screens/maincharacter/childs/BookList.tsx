import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import { BookSummary } from '../../../types/types';
import { searchBooks } from '../../../api/bookApi';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

type BookListProps = {
  bookList: BookSummary[];
  currentPage: number;
  previousPage: () => void;
  nextPage: () => void;
  goToDetail: (book: BookSummary) => void;
  navigation: NavigationProp<ParamListBase>;
};

const BookList = ({
  bookList,
  currentPage,
  previousPage,
  nextPage,
  goToDetail,
  navigation,
}: BookListProps) => {
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
        navigation.navigate('detail', foundBook);
        setSearchText(''); // 검색 후 입력 필드 초기화
      } else {
        alert('일치하는 책이 없습니다.');
      }
    } catch (error) {
      console.error('filed:', error);
      alert('검색 중 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={previousPage}
        style={({ pressed }) => [
          styles.beforeStyle, // Pressable 전체 스타일을 지정
          {
            opacity: pressed ? 0.3 : 1,
          },
        ]}
      >
        <Image
          source={require('../../../assets/images/button/before.png')}
          style={[styles.beforeImage, { zIndex: -999 }]}
        />
      </Pressable>
      <View style={styles.textContainer}>
        {bookList.length > 0 && (
          <Pressable onPress={() => goToDetail(bookList[currentPage])}>
            <View style={styles.box}>
              {/* <Text style={styles.text}>이 책 어때요 ?</Text> */}
              <Image
                source={{ uri: bookList[currentPage].coverImage }}
                style={styles.bookCover}
              />
              <Text style={styles.titletext}>
                {bookList[currentPage].bookTitle}
              </Text>
            </View>
          </Pressable>
        )}
      </View>
      <Pressable
        onPress={nextPage}
        style={({ pressed }) => [
          styles.nextStyle,
          {
            opacity: pressed ? 0.3 : 1,
          },
        ]}
      >
        <Image
          source={require('../../../assets/images/button/next.png')}
          style={styles.nextStyle}
        />
      </Pressable>
      <View style={styles.searchButtonAndInputContainer}>
        <Pressable onPress={handleToggleOrSearch}>
          {/* <MaterialCommunityIcons
            name="card-search-outline"
            size={100}
            color="#C5E1C9"
          /> */}
          <Image source={require('../../../assets/images/button/find.png')} />
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

      <View style={styles.likeButton}>
        <Pressable onPress={() => navigation.navigate('likeList')}>
          <Image source={require('../../../assets/images/button/heart.png')} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  box: {
    borderWidth: 6,
    borderColor: '#062D3E',
    backgroundColor: '#87CEE9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -80,
    width: 785,
    height: 490,
    borderRadius: 20,
  },
  beforeStyle: {
    position: 'relative',
    top: -10,
    left: 80,
  },
  beforeImage: {
    // Image의 스타일
    top: 0,
    left: 0,
    position: 'relative',
  },
  nextStyle: {
    position: 'relative',
    top: -10,
    right: 40,
  },
  nextImage: {
    // Image의 스타일
    top: 0,
    left: 0,
    position: 'relative',
  },
  text: {
    textAlign: 'center',
    fontFamily: 'im-hyemin-bold',
    fontSize: 55,
    marginBottom: 10,
  },
  titletext: {
    textAlign: 'center',
    fontFamily: 'im-hyemin-bold',
    fontSize: 48,
    marginTop: 20,
  },
  bookCover: {
    width: '40%',
    height: '70%',
    resizeMode: 'contain',
  },
  nextbutton: { right: '100%', bottom: '8%' },
  beforebutton: { left: '100%', bottom: '8%', zIndex: 0 },
  searchButtonAndInputContainer: {
    position: 'absolute',
    right: 14,
    top: -90,
    zIndex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    padding: 15,
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: '#C5E1C9',
    width: 500,
    fontFamily: 'im-hyemin-bold',
    fontSize: 20,
  },
  likeButton: {
    position: 'absolute',
    right: 14,
    top: -20,
    zIndex: 1,
  },
});

export default BookList;
