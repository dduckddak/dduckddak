import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { getLikeList, LikeBookListData } from '../../api/bookApi';
import { BookSummary } from '../../types/types';

interface LikeListScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const LikeListScreen: React.FC<LikeListScreenProps> = ({ navigation }) => {
  // 좋아요한 책 리스트를 저장할 상태
  const [likeList, setLikeList] = useState<LikeBookListData>();
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);
  // 오류 메시지 상태
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const LikeList = async () => {
      setIsLoading(true);
      try {
        const response = await getLikeList();
        setLikeList(response);
        console.log(response);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed:', error);
        setErrorMessage('좋아요한 책 리스트를 가져오는 데 실패했습니다.');
        setIsLoading(false);
      }
    };

    LikeList();
  }, []);

  const goToDetail = (bookSummary: BookSummary | undefined) => {
    console.log(bookSummary);
    navigation.navigate('detail', bookSummary);
  };

  const renderItem = ({ item }: { item: BookSummary }) => (
    <Pressable onPress={() => goToDetail(item)}>
      <View style={styles.bookItem}>
        <Image
          source={require('../../assets/images/books/brownbookcover.png')}
          style={styles.bookcover}
        />
        <Image source={{ uri: item.coverImage }} style={styles.bookImage} />
        <Text style={styles.bookTitle}>{item.bookTitle}</Text>
      </View>
    </Pressable>
  );

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  // if (errorMessage) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <Text>{errorMessage}</Text>
  //     </View>
  //   );
  // }

  return (
    <ImageBackground
      source={require('../../assets/images/background/MainBackground.png')}
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <Text style={styles.liketext}>좋아요한 책 목록</Text>

        <FlatList
          data={likeList?.likeBookList}
          renderItem={renderItem}
          keyExtractor={(item) => item.bookId.toString()}
          numColumns={4}
          contentContainerStyle={styles.flatListContent}
        />
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
    padding: 20,
    paddingBottom: 5,
  },
  liketext: {
    textAlign: 'center',
    fontFamily: 'im-hyemin-bold',
    fontSize: 40,
    marginTop: 20,
  },
  requiretext: {
    textAlign: 'center',
    fontFamily: 'im-hyemin-bold',
    fontSize: 25,
    marginTop: 15,
    marginBottom: 0,
  },
  flatListContent: {
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 40,
    marginTop: 0,
    marginLeft: -10,
  },
  bookItem: {
    margin: 30,
    marginBottom: 80,
    alignItems: 'center',
    // backgroundColor: '#ddd',
    borderRadius: 5,
    width: 250,
    height: 280,
    justifyContent: 'center',
    position: 'relative',
  },
  bookcover: {
    position: 'absolute',
    top: 20,
    left: 0,
    zIndex: -20,
    width: '120%',
    height: '125%',
  },
  bookImage: {
    width: '100%',
    height: '105%',
    resizeMode: 'cover',
    position: 'absolute', // bookcover 위에 겹쳐지도록 절대 위치로 설정
    top: 25,
    left: 20,
    zIndex: 1,
  },
});

export default LikeListScreen;
