import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Animated,
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
  const CharrrrAnimation = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    return () => CharrrrAnimation.removeAllListeners();
  });

  const handlePress = () => {
    CharrrrAnimation.setValue(1);
    // CharrrrAnimation.addListener(({ value }) => console.log(value));

    setTimeout(() => {
      CharrrrAnimation.stopAnimation();
    }, 1000);

    Animated.timing(CharrrrAnimation, {
      toValue: 2,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      CharrrrAnimation.setValue(1);
      navigation.navigate('makingBook', { bookTitle: title });
    });
  };

  return (
    <TouchableOpacity style={styles.bookItem} onPress={handlePress}>
      <Animated.View
        style={[
          {
            transform: [{ scale: CharrrrAnimation }],
          },
        ]}
      >
        <Image source={coverImage} style={styles.coverImage} />
        <Text style={styles.title}>{title}</Text>
      </Animated.View>
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
  },
  coverImage: {
    // flex: 1,
    width: Dimensions.get('screen').width * 0.4,
    height: Dimensions.get('screen').height * 0.64,
    resizeMode: 'cover',
    borderRadius: 10,
    borderWidth: 6,
    borderColor: '#A16A4A',
    zIndex: 20,
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
