import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// 책 목록 데이터 타입 정의
interface Book {
  title: string;
  coverImage: any; // 이미지 소스는 any 타입으로 설정
}

const bookList: Book[] = [
  {
    title: '내가 만든 책 1',
    coverImage: require('../../assets/images/books/book1.png'),
  },
  {
    title: '내가 만든 책 2',
    coverImage: require('../../assets/images/books/book2.png'),
  },
  {
    title: '내가 만든 책 2',
    coverImage: require('../../assets/images/books/book2.png'),
  },
  {
    title: '내가 만든 책 1',
    coverImage: require('../../assets/images/books/book1.png'),
  },
  {
    title: '내가 만든 책 1',
    coverImage: require('../../assets/images/books/book1.png'),
  },
  {
    title: '내가 만든 책 2',
    coverImage: require('../../assets/images/books/book2.png'),
  },
  {
    title: '내가 만든 책 1',
    coverImage: require('../../assets/images/books/book1.png'),
  },
];

const BookItems: React.FC<{
  title: string;
  coverImage: any;
  navigation: any;
}> = ({ title, coverImage, navigation }) => {
  const handlePress = () => {
    navigation.navigate('makingBook', { bookTitle: title });
  };

  return (
    <TouchableOpacity style={styles.bookItem} onPress={handlePress}>
      <Image source={coverImage} style={styles.coverImage} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const BookListScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../../assets/images/background/MainBackground.png')}
      style={styles.imageBackground}
    >
      <View>
        <FlatList
          data={bookList}
          renderItem={({ item }) => (
            <BookItems
              title={item.title}
              coverImage={item.coverImage}
              navigation={navigation}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.bookList}
        />
      </View>
      <Image
        source={require('../../assets/images/Trash.png')}
        style={styles.trash}
      />
    </ImageBackground>
  );
};

export default BookListScreen;

const styles = StyleSheet.create({
  bookList: {
    alignItems: 'center',
    paddingTop: 90,
  },
  bookItem: {
    margin: 20,
    alignItems: 'center',
    marginRight: 35,
    marginLeft: 35,
  },
  coverImage: {
    flex: 1,
    width: 500,
    height: 530,
    resizeMode: 'cover',
    borderRadius: 10,
    borderWidth: 6,
    borderColor: '#A16A4A',
  },
  title: {
    fontFamily: 'im-hyemin-bold',
    fontSize: 50,
    marginTop: 5,
    textAlign: 'center',
    textShadowColor: 'white',
    textShadowOffset: { width: 5, height: 4 },
    textShadowRadius: 3, // 블러
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  trash: {
    position: 'absolute',
    width: 90,
    height: 90,
    right: '92.5%',
    top: '86%',
  },
});
