import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  Dimensions,
  FlatList,
  ImageBackground,
  Image,
  ActivityIndicator,
  Pressable
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { getLikeList, LikeBookListData } from '../../api/bookApi';
import { BookSummary } from '../../types/types';

interface LikeListScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const LikeListScreen: React.FC<LikeListScreenProps> = ({
  navigation,
}) => {
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
    console.log(bookSummary)
    navigation.navigate('detail', bookSummary);
  };

  const renderItem = ({ item }: { item: BookSummary }) => (
    <Pressable onPress={() => goToDetail(item)}>
      <View style={styles.bookItem}>
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
}

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
    // margin: 10,
    paddingTop: 0,
    paddingBottom: 40,
    marginTop: 0,
  },
  bookItem: {
    margin: 10,
    marginTop: 50,
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 5,
    width: Dimensions.get('screen').width * 0.22,
    height: 300,
    justifyContent: 'center',
  },
  bookImage: {
    width: '100%',
    height: '100%', // 이미지가 전체 컨테이너의 80%를 차지하도록 설정
    resizeMode: 'cover',
    borderRadius: 5,
  },
  bookTitle: {
    textAlign: 'center',
    position: 'absolute', // 책 이름을 책 아래에 위치시키기 위해 절대 위치로 설정
    bottom: -35,
    fontFamily: 'im-hyemin-bold',
    fontSize: 25,
  },
});

export default LikeListScreen;
