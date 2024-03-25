import React, { useEffect, useRef, useState } from 'react';
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
import { Colors } from '../../components/Ui/styles';

import { getMakeBookList, MakeBookListData } from '../../api/makeBookApi';

interface Book {
  title: string;
  coverImage: any; // 이미지 소스는 any 타입으로 설정
}

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
  const [makeBookList, setMakeBookList] = useState<MakeBookListData[]>([]);

  const fetchMakeBooks = async () => {
    try {
      const makeBooksResponse = await getMakeBookList();
      setMakeBookList(makeBooksResponse);
      console.log('makebooks', makeBooksResponse);
    } catch (error) {
      console.log('에러!', error);
    }
  };

  useEffect(() => {
    fetchMakeBooks();
  }, []);

  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../assets/images/background/MainBackground.png')}
      style={styles.imageBackground}
    >
      <View>
        <FlatList
          data={makeBookList}
          renderItem={({ item }) => (
            <BookItems
              title={makeBookList.makeBookTitle}
              coverImage={makeBookList.makeBookCover}
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
    width: Dimensions.get('screen').width * 0.4,
    height: Dimensions.get('screen').height * 0.65,
    resizeMode: 'cover',
    borderRadius: 10,
    borderWidth: 6,
    borderColor: Colors.green,
    zIndex: 20,
  },
  title: {
    fontFamily: 'im-hyemin-bold',
    fontSize: 45,
    marginTop: 5,
    textAlign: 'center',
    textShadowColor: 'white',
    textShadowOffset: { width: 5, height: 4 },
    textShadowRadius: 3,
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
